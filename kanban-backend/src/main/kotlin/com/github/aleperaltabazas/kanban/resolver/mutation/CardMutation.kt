package com.github.aleperaltabazas.kanban.resolver.mutation

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.constants.MAP_REF
import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.domain.Card
import com.github.aleperaltabazas.kanban.domain.Label
import com.github.aleperaltabazas.kanban.domain.Status
import com.github.aleperaltabazas.kanban.domain.Task
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
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Component

@Component
class CardMutation(
    private val cardDao: CardDAO,
    private val boardDao: BoardDAO,
    @Qualifier("objectMapperSnakeCase") private val objectMapper: ObjectMapper,
) : GraphQLMutationResolver {
    fun createCard(input: CreateCardInput): CreateCardPayload = CreateCardPayload(
        Card(input = input).also {
            cardDao.insert(it)
            boardDao.updateBoardLastUpdated(boardId = input.boardId)
        }
    )

    fun updateCard(input: UpdateCardInput, environment: DataFetchingEnvironment): UpdateCardPayload {
        val card = cardDao.update(
            id = input.id,
            changes = combine(
                set("title", input.title),
                set("description", input.description),
                set("priority", input.priority),
                input.status?.let {
                    set(
                        "status",
                        objectMapper.convertValue(Status(it), MAP_REF),
                    )
                } ?: Document(),
                set(
                    "tasks",
                    input.tasks.map {
                        objectMapper.convertValue(Task(it), MAP_REF)
                    },
                ),
                set(
                    "labels",
                    input.labels.map {
                        objectMapper.convertValue(Label(it), MAP_REF)
                    },
                ),
            ),
            selectedFields = environment.cardSelectionSet() + "board_id",
        )
            ?: throw NotFoundException("No card found with ID ${input.id}")

        boardDao.updateBoardLastUpdated(boardId = card.boardId!!)

        return UpdateCardPayload(card)
    }

    fun moveCard(input: MoveCardInput, environment: DataFetchingEnvironment): MoveCardPayload {
        val card = cardDao.update(
            id = input.id,
            changes = set(
                "status",
                objectMapper.convertValue(Status(input.to), MAP_REF),
            ),
            selectedFields = environment.cardSelectionSet() + "board_id",
        )
            ?: throw NotFoundException("No card found with ID ${input.id}")

        boardDao.updateBoardLastUpdated(boardId = card.boardId!!)

        return MoveCardPayload(card)
    }

    fun deleteCard(input: DeleteCardInput): DeleteCardPayload {
        val card = cardDao.delete(
            id = input.id,
            selectedFields = listOf("id", "board_id"),
        ) ?: throw NotFoundException("No card found with ID ${input.id}")

        boardDao.updateBoardLastUpdated(boardId = card.boardId!!)

        return DeleteCardPayload(
            card.id,
        )
    }
}