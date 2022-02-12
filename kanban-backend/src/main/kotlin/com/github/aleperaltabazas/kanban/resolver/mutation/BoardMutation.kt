package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.domain.Board
import com.github.aleperaltabazas.kanban.exception.NotFoundException
import com.github.aleperaltabazas.kanban.extension.boardSelectionSet
import com.github.aleperaltabazas.kanban.input.CreateBoardInput
import com.github.aleperaltabazas.kanban.input.DeleteBoardInput
import com.github.aleperaltabazas.kanban.input.UpdateBoardInput
import com.github.aleperaltabazas.kanban.payload.CreateBoardPayload
import com.github.aleperaltabazas.kanban.payload.DeleteBoardPayload
import com.github.aleperaltabazas.kanban.payload.UpdateBoardPayload
import com.mongodb.client.model.Updates.combine
import com.mongodb.client.model.Updates.set
import graphql.kickstart.tools.GraphQLMutationResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.time.LocalDateTime

@Component
class BoardMutation(
    private val boardDao: BoardDAO,
) : GraphQLMutationResolver {
    fun createBoard(input: CreateBoardInput): CreateBoardPayload {
        val board = Board(input)
        boardDao.insert(board)

        return CreateBoardPayload(
            board = board,
        )
    }

    fun updateBoard(input: UpdateBoardInput, environment: DataFetchingEnvironment): UpdateBoardPayload {
        val board = boardDao.update(
            id = input.id,
            changes = combine(
                set("title", input.title),
                set("last_updated", LocalDateTime.now()),
            ),
            selectedFields = environment.boardSelectionSet(),
        )
            ?: throw NotFoundException("No such board ${input.id}")

        return UpdateBoardPayload(
            board = board,
        )
    }

    fun deleteBoard(input: DeleteBoardInput): DeleteBoardPayload {
        val board = boardDao.delete(input.id)
            ?: throw NotFoundException("Board ${input.id} not found")

        return DeleteBoardPayload(board.id)
    }
}