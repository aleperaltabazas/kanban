package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.dao.LabelDAO
import com.github.aleperaltabazas.kanban.domain.Board
import com.github.aleperaltabazas.kanban.exception.NotFoundException
import com.github.aleperaltabazas.kanban.extension.boardSelectionSet
import com.github.aleperaltabazas.kanban.extension.eq
import com.github.aleperaltabazas.kanban.input.*
import com.github.aleperaltabazas.kanban.payload.*
import com.mongodb.client.model.Updates.combine
import com.mongodb.client.model.Updates.set
import graphql.kickstart.tools.GraphQLMutationResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class BoardMutation(
    private val boardDao: BoardDAO,
    private val cardDao: CardDAO,
    private val labelDao: LabelDAO,
) : GraphQLMutationResolver {
    fun createBoard(input: CreateBoardInput): CreateBoardPayload {
        val board = Board(input)
        boardDao.insert(board)

        return CreateBoardPayload(
            board = board,
        )
    }

    fun updateBoard(input: UpdateBoardInput, environment: DataFetchingEnvironment): UpdateBoardPayload {
        val alias = input.title.replace(" ", "-")

        val board = boardDao.update(
            id = input.id,
            changes = combine(
                set("title", input.title),
                set("alias", alias),
                set("last_updated", LocalDateTime.now()),
            ),
            selectedFields = environment.boardSelectionSet(),
        )
            ?: throw NotFoundException("No such board ${input.id}")

        labelDao.updateMany(
            "board_id" eq input.id,
            set("board_alias", alias),
        )

        cardDao.updateMany(
            "board_id" eq input.id,
            set("board_alias", alias),
        )

        return UpdateBoardPayload(
            board = board,
        )
    }

    fun deleteBoard(input: DeleteBoardInput): DeleteBoardPayload {
        val board = boardDao.delete(input.id)
            ?: throw NotFoundException("Board ${input.id} not found")

        return DeleteBoardPayload(board.id)
    }

    fun restoreBoard(input: RestoreBoardInput, environment: DataFetchingEnvironment): RestoreBoardPayload {
        val board = boardDao.update(
            id = input.id,
            changes = combine(
                set("deleted", false),
            ),
            selectedFields = environment.boardSelectionSet(),
        )
            ?: throw NotFoundException("Board ${input.id} not found")

        return RestoreBoardPayload(board)
    }

    fun permanentDeleteBoard(input: PermanentDeleteBoardInput): PermanentDeleteBoardPayload {
        boardDao.permanentDelete(input.ids)

        return PermanentDeleteBoardPayload(input.ids)
    }
}