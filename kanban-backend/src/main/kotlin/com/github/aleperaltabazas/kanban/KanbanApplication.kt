package com.github.aleperaltabazas.kanban

import com.github.aleperaltabazas.kanban.db.tables.CardLabels
import com.github.aleperaltabazas.kanban.db.tables.Cards
import com.github.aleperaltabazas.kanban.db.tables.Labels
import com.github.aleperaltabazas.kanban.db.tables.Tasks
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KanbanApplication {
    init {
        Database.connect(
            url = "jdbc:mysql://localhost:3306/test",
            driver = "com.mysql.cj.jdbc.Driver",
            user = "root",
            password = "root",
        )

        transaction {
            addLogger(StdOutSqlLogger)
            SchemaUtils.create(Cards, Tasks, Labels, CardLabels)
        }
    }
}

fun main(args: Array<String>) {
    runApplication<KanbanApplication>(*args)
}
