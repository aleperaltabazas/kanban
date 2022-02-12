package com.github.aleperaltabazas.kanban.domain

import com.github.aleperaltabazas.kanban.input.CreateBoardInput
import com.github.aleperaltabazas.kanban.input.UpdateBoardInput
import java.time.LocalDateTime
import java.util.*

data class Board(
    override val id: UUID?,
    val title: String?,
    val alias: String?,
    val lastUpdated: LocalDateTime?,
) : Entity {
    constructor(input: CreateBoardInput) : this(
        id = UUID.randomUUID(),
        title = input.title,
        alias = input.title.lowercase().replace(' ', '-'),
        lastUpdated = LocalDateTime.now(),
    )

    constructor(input: UpdateBoardInput) : this(
        id = input.id,
        title = input.title,
        alias = input.title.lowercase().replace(' ', '-'),
        lastUpdated = LocalDateTime.now(),
    )
}
