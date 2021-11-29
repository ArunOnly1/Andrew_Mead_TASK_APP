const express = require('express')
const debug = require('debug')('index')

const db_connect = require('./db/mongoose')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const { Task } = require('./model/Task')

const app = express()
app.use(express.json())

db_connect()

const port = process.env.PORT

app.use((req, res, next) => {
  if (process.env.MODE === 'maintenance') {
    return res.status(503).send({
      message: 'The site is under maintenance. Please come back soon.',
    })
  }
  next()
})

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  debug(`Connected on port ${port}`)
})
