package com.github.aleperaltabazas.kanban.dao

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.domain.Entity
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters.eq
import org.bson.Document
import java.util.*

abstract class DAO<T : Entity>(
    protected val coll: MongoCollection<Document>,
    protected val objectMapper: ObjectMapper,
    private val ref: TypeReference<T>,
) {
    fun findByID(id: UUID): T? = coll.find(Document("id", id.toString()))
        .firstOrNull()
        ?.let { objectMapper.convertValue(it, ref) }

    fun findAll(): List<T> = coll.find()
        .map { objectMapper.convertValue(it, ref) }
        .toList()

    fun insert(input: T) {
        coll.insertOne(toDocument(input))
    }

    fun update(input: T) {
        coll.replaceOne(eq("id", input.id.toString()), toDocument(input))
    }

    protected fun toDocument(input: Any) = Document(objectMapper.convertValue(input, MAP_REF))

    companion object {
        private val MAP_REF = object : TypeReference<Map<String, Any?>>() {}
    }
}