package com.github.aleperaltabazas.kanban.db.dao

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.domain.Entity
import com.github.aleperaltabazas.kanban.extension.and
import com.github.aleperaltabazas.kanban.extension.eq
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Filters.not
import com.mongodb.client.model.Updates.set
import org.bson.Document
import java.util.*

abstract class DAO<T : Entity>(
    protected val coll: MongoCollection<Document>,
    protected val objectMapper: ObjectMapper,
    private val ref: TypeReference<T>,
) {
    private val notDeleted = not(eq("deleted", true))

    fun findByID(id: UUID): T? = coll.find(
        "id" eq id.toString() and notDeleted,
    )
        .firstOrNull()
        ?.let { deserialize(it) }

    fun findAll(): List<T> = coll.find(notDeleted)
        .map { objectMapper.convertValue(it, ref) }
        .toList()

    fun delete(id: UUID) = coll.findOneAndUpdate(
        "id" eq id.toString() and notDeleted,
        set("deleted", true),
    )
        ?.let { objectMapper.convertValue(it, ref) }

    fun insert(input: T) {
        coll.insertOne(serialize(input))
    }

    fun replace(input: T) {
        coll.replaceOne(eq("id", input.id.toString()), serialize(input))
    }

    protected open fun deserialize(it: Document): T = objectMapper.convertValue(it, ref)
    protected open fun serialize(input: Any) = Document(objectMapper.convertValue(input, MAP_REF))

    companion object {
        private val MAP_REF = object : TypeReference<Map<String, Any?>>() {}
    }
}