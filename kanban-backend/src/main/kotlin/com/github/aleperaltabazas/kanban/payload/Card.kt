package com.github.aleperaltabazas.kanban.payload

import com.github.aleperaltabazas.kanban.domain.Card
import java.util.*

data class CreateCardPayload(
    val card: Card?,
)

data class UpdateCardPayload(
    val card: Card?,
)

data class MoveCardPayload(
    val card: Card?,
)

data class DeleteLabelPayload(
    val id: UUID?,
)

data class DeleteCardPayload(
    val id: UUID?,
)
