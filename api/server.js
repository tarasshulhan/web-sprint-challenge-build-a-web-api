const express = require('express');
const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")
const {errorHandling} = require('./middleware/middleware')
const server = express()

server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.use(errorHandling)

module.exports = server
