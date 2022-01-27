package com.github.aleperaltabazas.kanban.domain

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import com.github.aleperaltabazas.kanban.input.CreateCardInput
import com.github.aleperaltabazas.kanban.input.StatusInput
import com.github.aleperaltabazas.kanban.input.TaskInput
import java.time.LocalDateTime
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

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    property = "ref",
    visible = true,
)
@JsonSubTypes(
    JsonSubTypes.Type(value = Backlog::class, name = "BACKLOG"),
    JsonSubTypes.Type(value = WIP::class, name = "WIP"),
    JsonSubTypes.Type(value = Done::class, name = "DONE"),
)
sealed interface Status {
    val ref: String

    companion object {
        operator fun invoke(input: StatusInput) = when (input) {
            StatusInput.BACKLOG -> Backlog
            StatusInput.WIP -> WIP
            StatusInput.DONE -> Done(LocalDateTime.now())
        }
    }
}

object Backlog : Status {
    override val ref = "BACKLOG"
}

object WIP : Status {
    override val ref: String = "WIP"
}

data class Done(
    val completionDate: LocalDateTime,
) : Status {
    override val ref: String = "DONE"
}
