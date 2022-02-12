package com.github.aleperaltabazas.kanban.domain

import com.github.aleperaltabazas.kanban.input.CreateLabelInput
import com.github.aleperaltabazas.kanban.input.LabelInput
import java.util.*

data class Label(
    override val id: UUID?,
    val boardId: UUID?,
    val boardAlias: String?,
    val name: String?,
    val color: String?,
) : Entity {
    constructor(input: LabelInput) : this(
        id = input.id,
        boardId = null,
        boardAlias = null,
        name = input.name,
        color = input.color,
    )

    constructor(input: CreateLabelInput, boardAlias: String) : this(
        id = UUID.randomUUID(),
        boardAlias = boardAlias,
        boardId = input.boardId,
        name = input.name,
        color = input.color
    )
}