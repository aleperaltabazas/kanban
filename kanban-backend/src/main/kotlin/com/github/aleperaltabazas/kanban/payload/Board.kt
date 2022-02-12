package com.github.aleperaltabazas.kanban.payload

import com.github.aleperaltabazas.kanban.domain.Board
import java.util.*

data class CreateBoardPayload(
    val board: Board,
)

data class UpdateBoardPayload(
    val board: Board,
)

data class DeleteBoardPayload(
    val id: UUID?,
)
