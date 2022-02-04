package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.domain.Card
import com.github.aleperaltabazas.kanban.extension.cardSelectionSet
import com.github.aleperaltabazas.kanban.extension.eq
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

    fun cards(boardId: UUID, environment: DataFetchingEnvironment): List<Card> = dao.findAll(
        filter = "board_id" eq boardId.toString(),
        selectedFields = environment.cardSelectionSet(),
    )
}