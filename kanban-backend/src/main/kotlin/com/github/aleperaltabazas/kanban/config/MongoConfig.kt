package com.github.aleperaltabazas.kanban.config

import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
class MongoConfig {
    @Bean
    fun mongo(): MongoClient = MongoClients.create(
        MongoClientSettings.builder()
            .applyConnectionString(ConnectionString("mongodb://localhost:27017/kanban"))
            .build()
    )

    @Bean
    fun mongoTemplate(mongo: MongoClient): MongoTemplate = MongoTemplate(mongo, "kanban")
}