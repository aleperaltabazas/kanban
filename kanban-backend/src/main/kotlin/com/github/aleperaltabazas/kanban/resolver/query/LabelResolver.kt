package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.LabelDAO
import com.github.aleperaltabazas.kanban.domain.Label
import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component

@Component
class LabelResolver(
    private val dao: LabelDAO,
) : GraphQLQueryResolver {
    fun labels(): List<Label> = dao.findAll()
}