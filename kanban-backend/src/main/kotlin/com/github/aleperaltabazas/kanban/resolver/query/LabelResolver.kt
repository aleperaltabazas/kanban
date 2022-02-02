package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.LabelDAO
import com.github.aleperaltabazas.kanban.dto.LabelDTO
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component

@Component
class LabelResolver(
    private val dao: LabelDAO,
) : GraphQLQueryResolver {
    fun labels(environment: DataFetchingEnvironment): List<LabelDTO> = dao.findAll()
        .map { LabelDTO(it) }
}