package com.github.aleperaltabazas.kanban.controller

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.servlet.ModelAndView

@Controller
class FrontendController(
    @Value("\${app.version}") private val version: String,
) {
    @GetMapping(value = ["/", "/kanban"])
    fun index() = ModelAndView(
        "index",
        mapOf(
            "version" to version,
        )
    )
}