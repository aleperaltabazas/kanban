package com.github.aleperaltabazas.kanban.extension

import graphql.schema.DataFetchingEnvironment

fun DataFetchingEnvironment.labelSelectionSet() = selectionSet.fields.map { it.name }
fun DataFetchingEnvironment.cardSelectionSet() = selectionSet.fields
    .map { it.qualifiedName.replace("/", ".").replace("card.", "") }
    .excluding("labels", "tasks", "status")

fun DataFetchingEnvironment.boardSelectionSet() = selectionSet.fields.map { it.name }
