package com.github.aleperaltabazas.kanban.domain

import java.util.*

data class Card(
    val id: UUID,
    val title: String,
    val description: String?,
    val priority: Int,
    val tasks: List<Task>,
)

data class Task(
    val description: String,
    val completed: Boolean,
    val priority: Int,
)
