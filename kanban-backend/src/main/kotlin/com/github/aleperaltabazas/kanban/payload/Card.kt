package com.github.aleperaltabazas.kanban.payload

import com.github.aleperaltabazas.kanban.domain.Card

data class CreateCardPayload(
    val card: Card,
)

data class UpdateCardPayload(
    val card: Card,
)

data class MoveCardPayload(
    val card: Card,
)
