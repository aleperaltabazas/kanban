package com.github.aleperaltabazas.kanban.payload

import com.github.aleperaltabazas.kanban.dto.LabelDTO

data class CreateLabelPayload(
    val label: LabelDTO,
)

data class UpdateLabelPayload(
    val label: LabelDTO,
)
