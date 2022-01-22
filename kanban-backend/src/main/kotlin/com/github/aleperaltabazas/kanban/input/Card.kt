package com.github.aleperaltabazas.kanban.input

data class CreateCardInput(
    val title: String,
    val description: String?,
    val priority: Int,
    val tasks: List<CreateTaskInput>,
)

data class CreateTaskInput(
    val description: String,
    val completed: Boolean,
    val priority: Int?,
)
