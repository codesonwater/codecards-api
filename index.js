const express = require ('express')
const cors = require ('cors')
const { createUser, loginUser, getUsers } = require('./src/users.js')
const { getQuestionById, getQuestions, getTopicBySlug } = require('./src/questions.js')
const { createQuestion } = require('./src/createQuestion.js')
const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(cors())

app.post('/users', createUser)
app.post('/login', loginUser)
app.get('/questions/:topicSlug', getTopicBySlug)
app.post('/questions/', createQuestion)
app.get('/users', getUsers)
app.get('/questions', getQuestions)
// app.get('/questions/:id', getQuestionById)

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
})