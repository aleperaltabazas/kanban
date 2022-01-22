package com.github.aleperaltabazas.kanban.payload

import com.github.aleperaltabazas.kanban.domain.Card

data class CreateCardPayload(
    val card: Card,
)
