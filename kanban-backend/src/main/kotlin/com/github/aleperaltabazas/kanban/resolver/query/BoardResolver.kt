package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.domain.Board
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component
import java.util.*

@Component
class BoardResolver(
    private val boardDao: BoardDAO,
) : GraphQLQueryResolver {
    fun board(id: UUID, environment: DataFetchingEnvironment): Board? = boardDao.findByID(
        id = id,
        selectedFields = environment.boardSelectionSet(),
    )

    fun boards(environment: DataFetchingEnvironment): List<Board> = boardDao.findAll(
        selectedFields = environment.boardSelectionSet(),
    )

    private fun DataFetchingEnvironment.boardSelectionSet() = selectionSet.fields.map { it.name }
}