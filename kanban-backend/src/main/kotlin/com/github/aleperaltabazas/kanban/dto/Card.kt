package com.github.aleperaltabazas.kanban.dto

import com.github.aleperaltabazas.kanban.domain.Card
import com.github.aleperaltabazas.kanban.domain.Status
import com.github.aleperaltabazas.kanban.domain.Task
import java.util.*

data class CardDTO(
    val id: UUID,
    val title: String,
    val description: String?,
    val priority: Int,
    val status: Status,
    val tasks: List<TaskDTO> = emptyList(),
    val labels: List<LabelDTO> = emptyList(),
) {
    constructor(card: Card) : this(
        id = card.id,
        title = card.title,
        description = card.description,
        priority = card.priority,
        status = card.status,
        tasks = card.tasks.map { TaskDTO(it) },
        labels = card.labels.map { LabelDTO(it) }
    )
}

data class TaskDTO(
    val description: String,
    val completed: Boolean,
    val priority: Int?,
) {
    constructor(task: Task) : this(
        description = task.description,
        completed = task.completed,
        priority = task.priority
    )
}
