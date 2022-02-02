package com.github.aleperaltabazas.kanban.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.dao.BoardDAO
import com.github.aleperaltabazas.kanban.dao.CardDAO
import com.github.aleperaltabazas.kanban.dao.LabelDAO
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
class DAOConfig {
    @Bean
    fun cardDao(
        @Qualifier("objectMapperSnakeCase") objectMapper: ObjectMapper,
        mongo: MongoTemplate,
    ) = CardDAO(
        cards = mongo.db.getCollection("cards"),
        objectMapper = objectMapper,
    )

    @Bean
    fun labelDao(
        @Qualifier("objectMapperSnakeCase") objectMapper: ObjectMapper,
        mongo: MongoTemplate,
    ) = LabelDAO(
        labels = mongo.db.getCollection("labels"),
        objectMapper = objectMapper,
    )

    @Bean
    fun boardDao(
        @Qualifier("objectMapperSnakeCase") objectMapper: ObjectMapper,
        mongo: MongoTemplate,
    ) = BoardDAO(
        boards = mongo.db.getCollection("boards"),
        objectMapper = objectMapper,
    )
}