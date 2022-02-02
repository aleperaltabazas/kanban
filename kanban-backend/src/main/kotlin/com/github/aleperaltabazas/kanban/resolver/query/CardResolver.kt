package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.dto.CardDTO
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component
import java.util.*

@Component
class CardResolver(
    private val dao: CardDAO,
) : GraphQLQueryResolver {
    fun card(id: UUID, environment: DataFetchingEnvironment): CardDTO? = dao.findByID(id)
        ?.let { CardDTO(it) }

    fun cards(environment: DataFetchingEnvironment): List<CardDTO> = dao.findAll()
        .map { CardDTO(it) }
}