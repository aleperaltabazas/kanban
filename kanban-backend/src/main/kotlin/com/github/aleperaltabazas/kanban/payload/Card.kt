package com.github.aleperaltabazas.kanban.payload

import com.github.aleperaltabazas.kanban.dto.CardDTO
import java.util.*

data class CreateCardPayload(
    val card: CardDTO,
)

data class UpdateCardPayload(
    val card: CardDTO,
)

data class MoveCardPayload(
    val card: CardDTO,
)

data class DeleteLabelPayload(
    val id: UUID,
)

data class DeleteCardPayload(
    val id: UUID,
)
