package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.domain.Board
import com.github.aleperaltabazas.kanban.extension.and
import com.github.aleperaltabazas.kanban.extension.boardSelectionSet
import com.github.aleperaltabazas.kanban.extension.eq
import com.mongodb.client.model.Filters.not
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component
import java.util.*

@Component
class BoardResolver(
    private val boardDao: BoardDAO,
) : GraphQLQueryResolver {
    fun board(id: UUID?, alias: String?, environment: DataFetchingEnvironment): Board? = when {
        id != null ->
            boardDao.findByID(
                id = id,
                selectedFields = environment.boardSelectionSet(),
            )
        alias != null -> boardDao.findOneBy(
            filter = "alias" eq alias,
            selectedFields = environment.boardSelectionSet(),
        )
        else -> throw IllegalArgumentException("Both 'id' and 'alias' can't be null simultaneously")
    }

    fun boards(environment: DataFetchingEnvironment): List<Board> = boardDao.findAll(
        filter = not("deleted" eq true) and not("deleted" eq true),
        selectedFields = environment.boardSelectionSet(),
    )
}