package com.github.aleperaltabazas.kanban.resolver

import com.github.aleperaltabazas.kanban.domain.Card
import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component
import java.util.*

@Component
class CardResolver : GraphQLQueryResolver {

    private val card = Card(
        title = "Test",
        description = "Test card",
        priority = 1,
        id = UUID.randomUUID(),
        tasks = emptyList(),
    )

    fun card(id: UUID): Card = card

    fun cards(): List<Card> = listOf(card)
}