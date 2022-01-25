package com.github.aleperaltabazas.kanban.config

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.*
import com.fasterxml.jackson.databind.json.JsonMapper
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.afterburner.AfterburnerModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

@Configuration
class ObjectMapperConfig {
    @Bean
    @Qualifier("objectMapperSnakeCase")
    @Primary
    fun objectMapperSnakeCase(): ObjectMapper = mapper(PropertyNamingStrategies.SNAKE_CASE)

    @Bean
    @Qualifier("objectMapperCamelCase")
    fun objectMapperCamelCase(): ObjectMapper = mapper(PropertyNamingStrategies.LOWER_CAMEL_CASE)

    private fun mapper(strategy: PropertyNamingStrategy) = JsonMapper.builder()
        .enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS)
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .serializationInclusion(JsonInclude.Include.NON_NULL)
        .propertyNamingStrategy(strategy)
        .addModules(
            AfterburnerModule(),
            KotlinModule.Builder().build(),
            Jdk8Module(),
            JavaTimeModule(),
        )
        .build()
}