package com.github.aleperaltabazas.kanban.json

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.Module
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.deser.std.StdDeserializer
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

val ISO_DTF: DateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME

class LocalDateTimeDeserializer : StdDeserializer<LocalDateTime>(LocalDateTime::class.java) {
    override fun deserialize(parser: JsonParser, context: DeserializationContext?): LocalDateTime = LocalDateTime.parse(
        parser.text,
        ISO_DTF,
    )
}

class LocalDateTimeSerializer : StdSerializer<LocalDateTime>(LocalDateTime::class.java) {
    override fun serialize(v: LocalDateTime, gen: JsonGenerator, p2: SerializerProvider?) {
        gen.writeString(ISO_DTF.format(v))
    }
}

val localDateTimeModule: Module = run {
    val module = SimpleModule()

    module.addDeserializer(LocalDateTime::class.java, LocalDateTimeDeserializer())
    module.addSerializer(LocalDateTime::class.java, LocalDateTimeSerializer())

    module
}
