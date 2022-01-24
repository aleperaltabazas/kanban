package com.github.aleperaltabazas.kanban.payload

import com.github.aleperaltabazas.kanban.domain.Label

data class CreateLabelPayload(
    val label: Label,
)

data class UpdateLabelPayload(
    val label: Label,
)
