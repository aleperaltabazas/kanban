package com.github.aleperaltabazas.kanban.exception

class NotFoundException(
    message: String,
    cause: Throwable? = null,
) : Exception(message, cause)
