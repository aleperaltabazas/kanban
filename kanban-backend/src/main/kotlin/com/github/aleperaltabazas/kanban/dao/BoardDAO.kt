package com.github.aleperaltabazas.kanban.dao

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.domain.Board
import com.mongodb.client.MongoCollection
import org.bson.Document

class BoardDAO(
    boards: MongoCollection<Document>,
    objectMapper: ObjectMapper,
) : DAO<Board>(boards, objectMapper, BOARD_REF) {
    companion object {
        private val BOARD_REF = object : TypeReference<Board>() {}
    }
}