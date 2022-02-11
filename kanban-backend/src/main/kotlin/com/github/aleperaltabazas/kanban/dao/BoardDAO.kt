package com.github.aleperaltabazas.kanban.dao

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.domain.Board
import com.github.aleperaltabazas.kanban.json.ISO_DTF
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Updates.set
import org.bson.Document
import java.time.LocalDateTime
import java.util.*

class BoardDAO(
    boards: MongoCollection<Document>,
    objectMapper: ObjectMapper,
) : DAO<Board>(boards, objectMapper, BOARD_REF) {
    fun updateBoardLastUpdated(boardId: UUID) {
        update(
            id = boardId,
            changes = set(
                "last_updated", LocalDateTime.now().format(ISO_DTF),
            ),
            selectedFields = listOf("_id"),
        )
    }

    companion object {
        private val BOARD_REF = object : TypeReference<Board>() {}
    }
}