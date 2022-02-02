package com.github.aleperaltabazas.kanban.domain

import com.github.aleperaltabazas.kanban.input.CreateBoardInput
import com.github.aleperaltabazas.kanban.input.UpdateBoardInput
import java.util.*

data class Board(
    override val id: UUID,
    val title: String,
    val alias: String,
) : Entity {
    constructor(input: CreateBoardInput) : this(
        id = UUID.randomUUID(),
        title = input.title,
        alias = input.title.lowercase().replace(' ', '-'),
    )

    constructor(input: UpdateBoardInput) : this(
        id = input.id,
        title = input.title,
        alias = input.title.lowercase().replace(' ', '-'),
    )
}
