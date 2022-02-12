package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.dao.LabelDAO
import com.github.aleperaltabazas.kanban.domain.Label
import com.github.aleperaltabazas.kanban.extension.and
import com.github.aleperaltabazas.kanban.extension.eq
import com.github.aleperaltabazas.kanban.extension.labelSelectionSet
import com.mongodb.client.model.Filters
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.bson.Document
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.util.*

@Component
class LabelResolver(
    private val labelDao: LabelDAO,
    private val boardDao: BoardDAO,
) : GraphQLQueryResolver {
    fun labels(boardId: UUID?, boardAlias: String?, environment: DataFetchingEnvironment): List<Label> = when {
        boardId != null -> {
            LOGGER.info("Fetch labels by id $boardId")

            labelDao.findAll(
                filter = "board_id" eq boardId.toString() and Filters.not("deleted" eq true),
                selectedFields = environment.labelSelectionSet(),
            )
        }
        boardAlias != null -> {
            LOGGER.info("Fetch labels by alias $boardAlias")

            boardDao.lookup(
                alias = boardAlias,
                lookupTo = "labels",
                selectedFields = environment.labelSelectionSet(),
            )
                .map { labelDao.deserialize((it["labels"] as? Document)!!) }
                .toList()
        }

        else -> throw IllegalArgumentException("Both 'boardId' and 'boardAlias' can't be null simultaneously")
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(LabelResolver::class.java)
    }
}