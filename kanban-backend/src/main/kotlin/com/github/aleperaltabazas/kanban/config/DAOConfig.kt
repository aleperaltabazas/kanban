package com.github.aleperaltabazas.kanban.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.aleperaltabazas.kanban.dao.CardDAO
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
class DAOConfig {
    @Bean
    fun cardDAO(
        @Qualifier("objectMapperSnakeCase") objectMapper: ObjectMapper,
        mongo: MongoTemplate,
    ) = CardDAO(
        cards = mongo.db.getCollection("cards"),
        objectMapper = objectMapper,
    )
}