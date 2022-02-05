package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.domain.Card
import com.github.aleperaltabazas.kanban.domain.Status
import com.github.aleperaltabazas.kanban.exception.NotFoundException
import com.github.aleperaltabazas.kanban.extension.cardSelectionSet
import com.github.aleperaltabazas.kanban.input.CreateCardInput
import com.github.aleperaltabazas.kanban.input.DeleteCardInput
import com.github.aleperaltabazas.kanban.input.MoveCardInput
import com.github.aleperaltabazas.kanban.input.UpdateCardInput
import com.github.aleperaltabazas.kanban.payload.CreateCardPayload
import com.github.aleperaltabazas.kanban.payload.DeleteCardPayload
import com.github.aleperaltabazas.kanban.payload.MoveCardPayload
import com.github.aleperaltabazas.kanban.payload.UpdateCardPayload
import com.mongodb.client.model.Updates.combine
import com.mongodb.client.model.Updates.set
import graphql.kickstart.tools.GraphQLMutationResolver
import graphql.schema.DataFetchingEnvironment
import org.bson.Document
import org.springframework.stereotype.Component

@Component
class CardMutation(
    private val dao: CardDAO,
) : GraphQLMutationResolver {
    fun createCard(input: CreateCardInput): CreateCardPayload = CreateCardPayload(
        Card(input = input).also { dao.insert(it) }
    )

    fun updateCard(input: UpdateCardInput, environment: DataFetchingEnvironment): UpdateCardPayload {
        val card = dao.update(
            id = input.id,
            changes = combine(
                set("title", input.title),
                set("description", input.description),
                set("priority", input.priority),
                input.status?.let { set("status", Status(it)) } ?: Document(),
                set("tasks", input.tasks),
                set("labels", input.labels),
            ),
            selectedFields = environment.cardSelectionSet(),
        )
            ?: throw NotFoundException("No card found with ID ${input.id}")

        return UpdateCardPayload(card)
    }

    fun moveCard(input: MoveCardInput, environment: DataFetchingEnvironment): MoveCardPayload {
        val card = dao.update(
            id = input.id,
            changes = combine(
                set("status", Status(input.to)),
            ),
            selectedFields = environment.cardSelectionSet(),
        )
            ?: throw NotFoundException("No card found with ID ${input.id}")

        return MoveCardPayload(card)
    }

    fun deleteCard(input: DeleteCardInput): DeleteCardPayload {
        val card = dao.delete(
            id = input.id,
            selectedFields = listOf("id"),
        ) ?: throw NotFoundException("No card found with ID ${input.id}")

        return DeleteCardPayload(
            card.id,
        )
    }
}