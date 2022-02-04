package com.github.aleperaltabazas.kanban.extension

fun <T> List<T>.excluding(vararg values: T): List<T> = this.filterNot { it in values }
