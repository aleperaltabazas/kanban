package com.github.aleperaltabazas.kanban.domain

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import com.github.aleperaltabazas.kanban.input.StatusInput
import java.time.LocalDateTime

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
