package com.github.aleperaltabazas.kanban.payload

import com.github.aleperaltabazas.kanban.dto.BoardDTO
import java.util.*

data class CreateBoardPayload(
    val board: BoardDTO,
)

data class UpdateBoardPayload(
    val board: BoardDTO,
)

data class DeleteBoardPayload(
    val id: UUID,
)
