package com.github.aleperaltabazas.kanban.extension

fun <A, B> mapOfNotNull(vararg values: Pair<A, B>?): Map<A, B> = listOfNotNull(*values).toMap()
