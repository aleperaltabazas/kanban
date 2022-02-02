package com.github.aleperaltabazas.kanban.dto

import com.github.aleperaltabazas.kanban.domain.Label
import java.util.*

data class LabelDTO(
    val id: UUID,
    val name: String,
    val color: String,
) {
    constructor(label: Label) : this(
        id = label.id,
        name = label.name,
        color = label.color,
    )
}
