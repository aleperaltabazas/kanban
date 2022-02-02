package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.domain.Board
import com.github.aleperaltabazas.kanban.dto.BoardDTO
import com.github.aleperaltabazas.kanban.exception.NotFoundException
import com.github.aleperaltabazas.kanban.input.CreateBoardInput
import com.github.aleperaltabazas.kanban.input.DeleteBoardInput
import com.github.aleperaltabazas.kanban.input.UpdateBoardInput
import com.github.aleperaltabazas.kanban.payload.CreateBoardPayload
import com.github.aleperaltabazas.kanban.payload.DeleteBoardPayload
import com.github.aleperaltabazas.kanban.payload.UpdateBoardPayload
import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component

@Component
class BoardMutation(
    private val boardDao: BoardDAO,
) : GraphQLQueryResolver {
    fun createBoard(input: CreateBoardInput): CreateBoardPayload {
        val board = Board(input)
        boardDao.insert(board)

        return CreateBoardPayload(
            board = BoardDTO(board),
        )
    }

    fun updateBoard(input: UpdateBoardInput): UpdateBoardPayload {
        val board = Board(input)
        boardDao.replace(board)

        return UpdateBoardPayload(
            board = BoardDTO(board),
        )
    }

    fun deleteBoard(input: DeleteBoardInput): DeleteBoardPayload {
        val board = boardDao.delete(input.id)
            ?: throw NotFoundException("Board ${input.id} not found")

        return DeleteBoardPayload(board.id)
    }
}