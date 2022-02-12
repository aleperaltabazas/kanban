package com.github.aleperaltabazas.kanban.controller

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView
import org.springframework.boot.web.servlet.error.ErrorController as SpringErrorController

@Controller
class ErrorController(
    @Value("\${app.version}") private val version: String,
) : SpringErrorController {
    @RequestMapping(value = ["/error"])
    fun error() = ModelAndView(
        "index",
        mapOf(
            "version" to version,
        )
    )
}