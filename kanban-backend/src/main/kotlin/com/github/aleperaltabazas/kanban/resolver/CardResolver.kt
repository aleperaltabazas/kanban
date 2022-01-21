package com.github.aleperaltabazas.kanban.resolver

import com.github.aleperaltabazas.kanban.domain.Card
import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component
import java.util.*

@Component
class CardResolver : GraphQLQueryResolver {
    fun card(id: UUID): Card = Card(
        title = "Test",
        description = "Test card",
        priority = 1,
        id = id,
    )
}