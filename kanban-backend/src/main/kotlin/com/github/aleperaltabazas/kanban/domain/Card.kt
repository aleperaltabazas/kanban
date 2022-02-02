package com.github.aleperaltabazas.kanban.domain

import com.github.aleperaltabazas.kanban.input.CreateCardInput
import com.github.aleperaltabazas.kanban.input.TaskInput
import java.util.*

data class Card(
    override val id: UUID,
    val title: String,
    val description: String?,
    val priority: Int,
    val status: Status,
    val tasks: List<Task> = emptyList(),
    val labels: List<Label> = emptyList(),
) : Entity {
    constructor(
        input: CreateCardInput,
    ) : this(
        id = UUID.randomUUID(),
        title = input.title,
        description = input.description,
        priority = input.priority,
        status = Status(input.status),
        tasks = input.tasks.map { Task(it) },
        labels = input.labels.map { Label(it) },
    )
}

data class Task(
    val description: String,
    val completed: Boolean,
    val priority: Int?,
) {
    constructor(input: TaskInput) : this(
        description = input.description,
        completed = input.completed,
        priority = input.priority,
    )
}
