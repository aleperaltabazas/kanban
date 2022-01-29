package com.github.aleperaltabazas.kanban.db.tables

import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.Table
import java.util.*

object Cards : UUIDTable("t_cards") {
    val title = varchar("title", 60)
    val description = text("description").nullable()
    val priority = integer("priority")
    val status = text("status")
}

object Tasks : UUIDTable("t_tasks") {
    val card = reference("card_id", Cards)
    val description = varchar("description", 60)
    val priority = integer("priority").nullable()
    val completed = bool("completed")
}

object Labels : UUIDTable("t_labels") {
    val name = varchar("name", 60)
    val color = varchar("color", 7)
}

object CardLabels : Table("t_card_x_labels") {
    val label = reference("label_id", Labels)
    val card = reference("card_id", Labels)

    override val primaryKey = PrimaryKey(label, card, name = "PK_CardLabels_label_card")
}

class LabelDao(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<LabelDao>(Labels)

    val name by Labels.name
    val color by Labels.color
}

class TaskDao(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<TaskDao>(Tasks)

    val description by Tasks.description
    val priority by Tasks.priority
    val completed by Tasks.completed
}

class CardDao(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<CardDao>(Cards)

    val title by Cards.title
    val description by Cards.description
    val tasks by TaskDao referencedOn Tasks.card
    val status by Cards.status
    val priority by Cards.priority
    var labels by LabelDao via Labels
}
