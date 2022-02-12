package com.github.aleperaltabazas.kanban.resolver.mutation

import com.github.aleperaltabazas.kanban.dao.BoardDAO
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
    private val boardDao: BoardDAO,
) : GraphQLMutationResolver {
    fun createLabel(input: CreateLabelInput): CreateLabelPayload {
        val board = boardDao.findByID(id = input.boardId, selectedFields = listOf("alias"))
            ?: throw NotFoundException("No board found with id ${input.boardId}")

        val label = Label(
            input = input,
            boardAlias = board.alias!!,
        )

        labelDao.insert(label)
        boardDao.updateBoardLastUpdated(boardId = input.boardId)

        return CreateLabelPayload(label)
    }

    fun updateLabel(input: UpdateLabelInput, environment: DataFetchingEnvironment): UpdateLabelPayload {
        val label = labelDao.update(
            id = input.id,
            changes = combine(
                set("name", input.name),
                set("color", input.color),
            ),
            selectedFields = environment.labelSelectionSet() + "board_id",
        )
            ?: throw NotFoundException("No label found with ID ${input.id}")

        cardsDao.updateCardLabels(label)
        boardDao.updateBoardLastUpdated(boardId = label.boardId!!)

        return UpdateLabelPayload(
            label.copy(
                name = input.name,
                color = input.color,
            )
        )
    }

    fun deleteLabel(input: DeleteLabelInput): DeleteLabelPayload {
        val label = labelDao.delete(
            id = input.id,
            selectedFields = listOf("id", "board_id")
        ) ?: throw NotFoundException("No label found with ID ${input.id}")

        cardsDao.deleteCardLabels(label)
        boardDao.updateBoardLastUpdated(boardId = label.boardId!!)

        return DeleteLabelPayload(
            id = label.id,
        )
    }
}