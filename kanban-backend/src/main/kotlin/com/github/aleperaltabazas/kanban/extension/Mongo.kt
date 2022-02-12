package com.github.aleperaltabazas.kanban.extension

import com.mongodb.client.model.Filters
import org.bson.Document
import org.bson.conversions.Bson

infix fun Bson.and(other: Bson) = Filters.and(this, other)

infix fun <TItem> String.eq(item: TItem) = Filters.eq(this, item)

fun documentOf(vararg values: Pair<String, Any?>?) = Document(mapOfNotNull(*values))
