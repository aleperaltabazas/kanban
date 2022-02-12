package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.domain.Card
import com.github.aleperaltabazas.kanban.extension.and
import com.github.aleperaltabazas.kanban.extension.cardSelectionSet
import com.github.aleperaltabazas.kanban.extension.eq
import com.mongodb.client.model.Filters.not
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.util.*

@Component
class CardResolver(
    private val cardDao: CardDAO,
) : GraphQLQueryResolver {
    fun card(id: UUID, environment: DataFetchingEnvironment): Card? = cardDao.findByID(
        id = id,
        selectedFields = environment.cardSelectionSet(),
    )

    fun cards(boardId: UUID?, boardAlias: String?, environment: DataFetchingEnvironment): List<Card> = when {
        boardId != null -> {
            LOGGER.info("Fetch cards by id $boardId")

            cardDao.findAll(
                filter = "board_id" eq boardId.toString() and not("deleted" eq true),
                selectedFields = environment.cardSelectionSet(),
            )
        }

        boardAlias != null -> {
            LOGGER.info("Fetch cards by alias $boardAlias")

            cardDao.findAll(
                filter = "board_alias" eq boardAlias and not("deleted" eq true),
                selectedFields = environment.cardSelectionSet()
            )
        }

        else -> throw IllegalArgumentException("Both 'boardId' and 'boardAlias' can't be null simultaneously")
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(CardResolver::class.java)
    }
}