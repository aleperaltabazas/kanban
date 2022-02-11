package com.github.aleperaltabazas.kanban.resolver.query

import com.github.aleperaltabazas.kanban.dao.LabelDAO
import com.github.aleperaltabazas.kanban.domain.Label
import com.github.aleperaltabazas.kanban.extension.documentOf
import com.github.aleperaltabazas.kanban.extension.eq
import com.github.aleperaltabazas.kanban.extension.labelSelectionSet
import graphql.kickstart.tools.GraphQLQueryResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component
import java.util.*

@Component
class LabelResolver(
    private val dao: LabelDAO,
) : GraphQLQueryResolver {
    fun labels(boardId: UUID, boardAlias: String?, environment: DataFetchingEnvironment): List<Label> = dao.findAll(
        filter = "board_id" eq boardId.toString(),
        selectedFields = environment.labelSelectionSet(),
    )
}