package com.github.aleperaltabazas.kanban.input

import java.util.*

data class CreateCardInput(
    val title: String,
    val description: String?,
    val priority: Int,
    val tasks: List<TaskInput>,
    val labels: List<LabelInput>,
    val status: StatusInput = StatusInput.BACKLOG,
)

data class TaskInput(
    val description: String,
    val completed: Boolean,
    val priority: Int?,
)

data class UpdateCardInput(
    val id: UUID,
    val title: String,
    val description: String?,
    val priority: Int,
    val tasks: List<TaskInput>,
    val labels: List<LabelInput>,
    val status: StatusInput?,
)

data class MoveCardInput(
    val id: UUID,
    val to: StatusInput,
)

enum class StatusInput {
    BACKLOG,
    DONE,
    WIP,
}

data class DeleteCardInput(
    val id: UUID,
)
