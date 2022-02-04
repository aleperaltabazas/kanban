package com.github.aleperaltabazas.kanban.domain

import com.github.aleperaltabazas.kanban.input.CreateLabelInput
import com.github.aleperaltabazas.kanban.input.LabelInput
import java.util.*

data class Label(
    override val id: UUID?,
    val name: String?,
    val color: String?,
) : Entity {
    constructor(input: LabelInput) : this(
        id = input.id,
        name = input.name,
        color = input.color,
    )

    constructor(input: CreateLabelInput) : this(
        id = UUID.randomUUID(),
        name = input.name,
        color = input.color
    )
}