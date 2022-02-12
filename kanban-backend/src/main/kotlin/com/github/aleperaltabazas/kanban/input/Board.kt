package com.github.aleperaltabazas.kanban.input

import java.util.*

data class CreateBoardInput(
    val title: String,
)

data class UpdateBoardInput(
    val id: UUID,
    val title: String,
)

data class DeleteBoardInput(
    val id: UUID,
)

data class RestoreBoardInput(
    val id: UUID,
)
