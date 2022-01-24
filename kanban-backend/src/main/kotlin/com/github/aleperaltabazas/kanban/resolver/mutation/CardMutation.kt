package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.domain.*
import com.github.aleperaltabazas.kanban.exception.NotFoundException
import com.github.aleperaltabazas.kanban.input.CreateCardInput
import com.github.aleperaltabazas.kanban.input.MoveCardInput
import com.github.aleperaltabazas.kanban.input.StatusInput
import com.github.aleperaltabazas.kanban.input.UpdateCardInput
import com.github.aleperaltabazas.kanban.payload.CreateCardPayload
import com.github.aleperaltabazas.kanban.payload.MoveCardPayload
import com.github.aleperaltabazas.kanban.payload.UpdateCardPayload
import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component
import java.time.LocalDateTime

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
            ).also { dao.update(it) }
        )
    }

    fun moveCard(input: MoveCardInput): MoveCardPayload {
        val card = dao.findByID(input.id) ?: throw NotFoundException("No card found with ID ${input.id}")

        return MoveCardPayload(
            card = card.copy(
                status = when (input.to) {
                    StatusInput.BACKLOG -> Backlog
                    StatusInput.WIP -> WIP
                    StatusInput.DONE -> Done(LocalDateTime.now())
                }
            )
        )
    }
}