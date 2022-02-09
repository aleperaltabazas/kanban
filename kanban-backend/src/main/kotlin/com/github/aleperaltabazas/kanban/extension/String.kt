package com.github.aleperaltabazas.kanban.extension

private val camelRegex = "(?<=[a-zA-Z])[A-Z]".toRegex()

fun String.toSnakeCase() = camelRegex.replace(this) {
    "_${it.value}"
}.lowercase()
