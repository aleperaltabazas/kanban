package com.github.aleperaltabazas.kanban.dao

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.constants.MAP_REF
import com.github.aleperaltabazas.kanban.domain.Entity
import com.github.aleperaltabazas.kanban.extension.and
import com.github.aleperaltabazas.kanban.extension.eq
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Filters.not
import com.mongodb.client.model.FindOneAndUpdateOptions
import com.mongodb.client.model.Projections.include
import com.mongodb.client.model.ReturnDocument
import com.mongodb.client.model.Updates.set
import org.bson.Document
import org.bson.conversions.Bson
import java.util.*

abstract class DAO<T : Entity>(
    protected val coll: MongoCollection<Document>,
    protected val objectMapper: ObjectMapper,
    private val ref: TypeReference<T>,
) : MongoCollection<Document> by coll {
    private val notDeleted = not(eq("deleted", true))

    fun findByID(
        id: UUID,
        selectedFields: List<String> = emptyList(),
    ): T? = findOneBy(
        "id" eq id.toString() and notDeleted,
        selectedFields,
    )

    fun findOneBy(
        filter: Bson,
        selectedFields: List<String> = emptyList(),
    ): T? = coll.find(filter)
        .limit(1)
        .projection(include(selectedFields))
        .firstOrNull()
        ?.let { deserialize(it) }

    fun findAll(
        filter: Bson = Document(),
        selectedFields: List<String> = emptyList(),
    ): List<T> = coll.find(filter)
        .projection(include(selectedFields))
        .map { objectMapper.convertValue(it, ref) }
        .toList()

    fun delete(
        id: UUID,
        selectedFields: List<String> = emptyList(),
    ) = update(
        id = id,
        changes = set("deleted", true),
        selectedFields = selectedFields,
    )

    fun insert(input: T) {
        coll.insertOne(serialize(input))
    }

    fun update(
        id: UUID,
        changes: Bson,
        selectedFields: List<String> = emptyList(),
    ): T? = coll.findOneAndUpdate(
        "id" eq id.toString(),
        changes,
        FindOneAndUpdateOptions()
            .returnDocument(ReturnDocument.AFTER)
            .projection(include(selectedFields)),
    )
        ?.let { objectMapper.convertValue(it, ref) }

    fun replace(input: T) {
        coll.replaceOne(eq("id", input.id!!.toString()), serialize(input))
    }

    open fun deserialize(it: Document): T = objectMapper.convertValue(it, ref)
    open fun serialize(input: Any): Document = Document(objectMapper.convertValue(input, MAP_REF))
}