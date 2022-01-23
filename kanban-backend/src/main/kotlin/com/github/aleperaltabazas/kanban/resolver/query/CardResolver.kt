package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.domain.Card
import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component
import java.util.*

@Component
class CardResolver(
    private val dao: CardDAO,
) : GraphQLQueryResolver {
    fun card(id: UUID): Card? = dao.findByID(id)

    fun cards(): List<Card> = dao.findAll()
}