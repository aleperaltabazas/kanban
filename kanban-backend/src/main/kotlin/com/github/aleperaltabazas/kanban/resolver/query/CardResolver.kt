package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.domain.Card
import com.github.aleperaltabazas.kanban.extension.cardSelectionSet
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component
import java.util.*

@Component
class CardResolver(
    private val dao: CardDAO,
) : GraphQLQueryResolver {
    fun card(id: UUID, environment: DataFetchingEnvironment): Card? = dao.findByID(
        id = id,
        selectedFields = environment.cardSelectionSet(),
    )

    fun cards(environment: DataFetchingEnvironment): List<Card> = dao.findAll(
        selectedFields = environment.cardSelectionSet(),
    )
}