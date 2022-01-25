package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.domain.Card
import com.github.aleperaltabazas.kanban.domain.Label
import com.github.aleperaltabazas.kanban.domain.Status
import com.github.aleperaltabazas.kanban.domain.Task
import com.github.aleperaltabazas.kanban.exception.NotFoundException
import com.github.aleperaltabazas.kanban.input.CreateCardInput
import com.github.aleperaltabazas.kanban.input.DeleteCardInput
import com.github.aleperaltabazas.kanban.input.MoveCardInput
import com.github.aleperaltabazas.kanban.input.UpdateCardInput
import com.github.aleperaltabazas.kanban.payload.CreateCardPayload
import com.github.aleperaltabazas.kanban.payload.DeleteCardPayload
import com.github.aleperaltabazas.kanban.payload.MoveCardPayload
import com.github.aleperaltabazas.kanban.payload.UpdateCardPayload
import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component

@Component
class CardMutation(
    private val dao: CardDAO,
) : GraphQLMutationResolver {
    fun createCard(input: CreateCardInput): CreateCardPayload = CreateCardPayload(
        Card(input = input)
            .also { dao.insert(it) }
    )

    fun updateCard(input: UpdateCardInput): UpdateCardPayload {
        val card = dao.findByID(input.id) ?: throw NotFoundException("No card found with ID ${input.id}")

        return UpdateCardPayload(
            card.copy(
                title = input.title,
                description = input.description,
                tasks = input.tasks.map { Task(it) },
                labels = input.labels.map { Label(it) },
                priority = input.priority,
                status = input.status?.let { Status(it) } ?: card.status,
            ).also { dao.replace(it) }
        )
    }

    fun moveCard(input: MoveCardInput): MoveCardPayload {
        val card = dao.findByID(input.id) ?: throw NotFoundException("No card found with ID ${input.id}")

        return MoveCardPayload(
            card = card.copy(
                status = Status(input.to),
            )
        )
    }

    fun deleteCard(input: DeleteCardInput): DeleteCardPayload {
        val card = dao.delete(input.id) ?: throw NotFoundException("No card found with ID ${input.id}")

        return DeleteCardPayload(
            card.id,
        )
    }
}