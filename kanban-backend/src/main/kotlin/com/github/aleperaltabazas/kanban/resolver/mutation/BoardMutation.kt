package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.domain.Board
import com.github.aleperaltabazas.kanban.exception.NotFoundException
import com.github.aleperaltabazas.kanban.extension.boardSelectionSet
import com.github.aleperaltabazas.kanban.extension.cardSelectionSet
import com.github.aleperaltabazas.kanban.extension.documentOf
import com.github.aleperaltabazas.kanban.input.CreateBoardInput
import com.github.aleperaltabazas.kanban.input.DeleteBoardInput
import com.github.aleperaltabazas.kanban.input.UpdateBoardInput
import com.github.aleperaltabazas.kanban.payload.CreateBoardPayload
import com.github.aleperaltabazas.kanban.payload.DeleteBoardPayload
import com.github.aleperaltabazas.kanban.payload.UpdateBoardPayload
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component

@Component
class BoardMutation(
    private val boardDao: BoardDAO,
) : GraphQLQueryResolver {
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
            changes = documentOf(
                "title" to input.title,
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