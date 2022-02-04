package com.github.aleperaltabazas.kanban.input

import java.util.*

data class LabelInput(
    val id: UUID,
    val name: String,
    val color: String,
)

data class CreateLabelInput(
    val boardId: UUID,
    val name: String,
    val color: String,
)

data class UpdateLabelInput(
    val id: UUID,
    val name: String,
    val color: String,
)

data class DeleteLabelInput(
    val id: UUID,
)
