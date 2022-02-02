package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.dto.BoardDTO
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component
import java.util.*

@Component
class BoardResolver(
    private val boardDao: BoardDAO,
) : GraphQLQueryResolver {
    fun board(id: UUID, environment: DataFetchingEnvironment): BoardDTO? = boardDao.findByID(id)
        ?.let { BoardDTO(it) }

    fun boards(environment: DataFetchingEnvironment): List<BoardDTO> = boardDao.findAll()
        .map { BoardDTO(it) }
}