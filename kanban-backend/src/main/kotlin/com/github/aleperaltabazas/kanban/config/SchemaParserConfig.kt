package com.github.aleperaltabazas.kanban.config

import com.github.aleperaltabazas.kanban.domain.Backlog
import com.github.aleperaltabazas.kanban.domain.Done
import com.github.aleperaltabazas.kanban.domain.WIP
import graphql.kickstart.tools.SchemaParserDictionary
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SchemaParserConfig {
    @Bean
    fun schemaParserDictionary() = SchemaParserDictionary()
        .add(Backlog::class.java)
        .add(WIP::class.java)
        .add(Done::class.java)
}