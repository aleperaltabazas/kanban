package com.github.aleperaltabazas.kanban.dao

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.domain.Label
import com.mongodb.client.MongoCollection
import org.bson.Document

class LabelDAO(
    labels: MongoCollection<Document>,
    objectMapper: ObjectMapper,
) : DAO<Label>(labels, objectMapper, LABEL_REF) {
    companion object {
        private val LABEL_REF = object : TypeReference<Label>() {}
    }
}