package com.github.aleperaltabazas.kanban.dao

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.domain.Card
import com.mongodb.client.MongoCollection
import org.bson.Document
import java.util.*

class CardDAO(
    private val cards: MongoCollection<Document>,
    private val objectMapper: ObjectMapper,
) {
    fun findByID(id: UUID) = cards.find(Document("id", id)).firstOrNull()
        ?.let { objectMapper.convertValue(it, CARD_REF) }

    fun findAll(): List<Card> = cards.find()
        .map { objectMapper.convertValue(it, CARD_REF) }
        .toList()

    fun insert(input: Card) {
        cards.insertOne(Document(objectMapper.convertValue(input, MAP_REF)))
    }

    companion object {
        private val CARD_REF = object : TypeReference<Card>() {}
        private val MAP_REF = object : TypeReference<Map<String, Any?>>() {}
    }
}