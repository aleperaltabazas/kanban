Kanban
===

Dumb Kanban board I made (bit of a Trello clone, too) to try GraphQL.
![image](https://user-images.githubusercontent.com/31170385/152054098-2c920076-c1c6-44f5-9f3b-d8111a89d4e0.png)

Backend built with spring-boot-graphql-starter for JVM (using Kotlin) and frontend with React + Typescript + Material UI using urql as GraphQL client. Persistence is done with Mongo.

## Features

* Only 3 columns: Backlog, WIP and Done. That's all you really need.
* Priority: it's a number. No such nonsense as 'low', 'high', 'critical' or whatever. What if you have to do something more critical? critical2?
* Label your cards and filter them easily (press and hold labels to edit them).
* Add subtasks on your cards and check them as you complete them.

## TODO

In no particular order:

* Trash bin
* Night theme
* Login
* Multiple boards per user
* Deliver completed cards/check delivered work
