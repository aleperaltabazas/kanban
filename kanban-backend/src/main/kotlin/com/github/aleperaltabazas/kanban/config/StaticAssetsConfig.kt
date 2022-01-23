package com.github.aleperaltabazas.kanban.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.RouterFunctions
import org.springframework.web.reactive.function.server.ServerResponse

@Configuration
class StaticAssetsConfig {
    @Bean
    fun staticAssetsRouter(): RouterFunction<ServerResponse?>? {
        return RouterFunctions
            .resources("/**", ClassPathResource("/static/"))
    }
}