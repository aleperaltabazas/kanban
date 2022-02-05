package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.dao.LabelDAO
import com.github.aleperaltabazas.kanban.domain.Label
import com.github.aleperaltabazas.kanban.exception.NotFoundException
import com.github.aleperaltabazas.kanban.extension.labelSelectionSet
import com.github.aleperaltabazas.kanban.input.CreateLabelInput
import com.github.aleperaltabazas.kanban.input.DeleteLabelInput
import com.github.aleperaltabazas.kanban.input.UpdateLabelInput
import com.github.aleperaltabazas.kanban.payload.CreateLabelPayload
import com.github.aleperaltabazas.kanban.payload.DeleteLabelPayload
import com.github.aleperaltabazas.kanban.payload.UpdateLabelPayload
import com.mongodb.client.model.Updates.combine
import com.mongodb.client.model.Updates.set
import graphql.kickstart.tools.GraphQLMutationResolver
import graphql.schema.DataFetchingEnvironment
import org.springframework.stereotype.Component

@Component
class LabelMutation(
    private val labelDao: LabelDAO,
    private val cardsDao: CardDAO,
) : GraphQLMutationResolver {
    fun createLabel(input: CreateLabelInput): CreateLabelPayload = CreateLabelPayload(
        Label(input).also { labelDao.insert(it) }
    )

    fun updateLabel(input: UpdateLabelInput, environment: DataFetchingEnvironment): UpdateLabelPayload {
        val label = labelDao.update(
            id = input.id,
            changes = combine(
                set("name", input.name),
                set("color", input.color),
            ),
            selectedFields = environment.labelSelectionSet(),
        )
            ?: throw NotFoundException("No label found with ID ${input.id}")

        cardsDao.updateCardLabels(label)

        return UpdateLabelPayload(
            label.copy(
                name = input.name,
                color = input.color,
            )
        )
    }

    fun deleteLabel(input: DeleteLabelInput): DeleteLabelPayload {
        val label = labelDao.delete(input.id) ?: throw NotFoundException("No label found with ID ${input.id}")
        cardsDao.deleteCardLabels(label)

        return DeleteLabelPayload(
            id = label.id,
        )
    }
}