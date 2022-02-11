package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.domain.Card
import com.github.aleperaltabazas.kanban.extension.and
import com.github.aleperaltabazas.kanban.extension.cardSelectionSet
import com.github.aleperaltabazas.kanban.extension.eq
import com.mongodb.client.model.Aggregates.*
import com.mongodb.client.model.Filters.not
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.bson.Document
import org.springframework.stereotype.Component
import java.util.*

@Component
class CardResolver(
    private val cardDao: CardDAO,
    private val boardDao: BoardDAO,
) : GraphQLQueryResolver {
    fun card(id: UUID, environment: DataFetchingEnvironment): Card? = cardDao.findByID(
        id = id,
        selectedFields = environment.cardSelectionSet(),
    )

    fun cards(boardId: UUID?, boardAlias: String?, environment: DataFetchingEnvironment): List<Card> = when {
        boardId != null ->
            cardDao.findAll(
                filter = "board_id" eq boardId.toString() and not("deleted" eq true),
                selectedFields = environment.cardSelectionSet(),
            )
        boardAlias != null -> boardDao.aggregate(
            listOf(
                match(
                    "alias" eq boardAlias
                ),
                limit(1),
                lookup(
                    "cards",
                    "id",
                    "board_id",
                    "cards",
                ),
                unwind("\$cards"),
                project(
                    Document(
                        environment.cardSelectionSet()
                            .map { "cards.$it" }
                            .associateWith { 1 })
                )
            )
        )
            .map { cardDao.deserialize((it["cards"] as? Document)!!) }
            .toList()

        else -> throw IllegalArgumentException("Both 'boardId' and 'boardAlias' can't be null simultaneously")
    }
}