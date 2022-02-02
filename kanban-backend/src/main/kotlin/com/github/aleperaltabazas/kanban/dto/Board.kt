package com.github.aleperaltabazas.kanban.dto

import com.github.aleperaltabazas.kanban.domain.Board
import java.util.*

data class BoardDTO(
    val id: UUID,
    val title: String,
    val alias: String,
) {
    constructor(board: Board) : this(
        id = board.id,
        title = board.title,
        alias = board.alias,
    )
}
