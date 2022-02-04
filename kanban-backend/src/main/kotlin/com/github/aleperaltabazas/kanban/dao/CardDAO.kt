package com.github.aleperaltabazas.kanban.dao

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.domain.Card
import com.github.aleperaltabazas.kanban.domain.Label
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Updates
import com.mongodb.client.model.Updates.set
import org.bson.Document

class CardDAO(
    cards: MongoCollection<Document>,
    objectMapper: ObjectMapper,
) : DAO<Card>(cards, objectMapper, CARD_REF) {
    fun updateCardLabels(label: Label) {

        coll.updateMany(
            eq("labels.id", label.id!!.toString()),
            Updates.combine(
                set("labels.$.name", label.name),
                set("labels.$.color", label.color),
            )
        )
    }

    fun deleteCardLabels(label: Label) {
        coll.updateMany(
            eq("labels.id", label.id!!.toString()),
            Updates.pull(
                "labels",
                eq("id", label.id.toString()),
            ),
        )
    }

    companion object {
        private val CARD_REF = object : TypeReference<Card>() {}
    }
}