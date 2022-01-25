package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.dao.LabelDAO
import com.github.aleperaltabazas.kanban.domain.Label
import com.github.aleperaltabazas.kanban.exception.NotFoundException
import com.github.aleperaltabazas.kanban.input.CreateLabelInput
import com.github.aleperaltabazas.kanban.input.DeleteLabelInput
import com.github.aleperaltabazas.kanban.input.UpdateLabelInput
import com.github.aleperaltabazas.kanban.payload.CreateLabelPayload
import com.github.aleperaltabazas.kanban.payload.DeleteLabelPayload
import com.github.aleperaltabazas.kanban.payload.UpdateLabelPayload
import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component

@Component
class LabelMutation(
    private val labelDao: LabelDAO,
    private val cardsDao: CardDAO,
) : GraphQLMutationResolver {
    fun createLabel(input: CreateLabelInput): CreateLabelPayload = CreateLabelPayload(
        Label(input).also { labelDao.insert(it) }
    )

    fun updateLabel(input: UpdateLabelInput): UpdateLabelPayload {
        val label = labelDao.findByID(input.id) ?: throw NotFoundException("No label found with ID ${input.id}")

        return UpdateLabelPayload(
            label.copy(
                name = input.name,
                color = input.color,
            ).also {
                labelDao.replace(it)
                cardsDao.updateCardLabels(it)
            }
        )
    }

    fun deleteLabel(input: DeleteLabelInput): DeleteLabelPayload {
        val label = labelDao.delete(input.id) ?: throw NotFoundException("No label found with ID ${input.id}")

        return DeleteLabelPayload(
            id = label.id,
        )
    }
}