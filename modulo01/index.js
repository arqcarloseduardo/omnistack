const express = require('express')

const server = express()

server.use(express.json())

//// Request body = {nome:"carlos", endereco: "kjdn"}

const users = ["Carlos", "Eduardo", "Zilda", "Lucca", "Isa", "Duda"]

//middleware Global
server.use((req,res, next) => {
  console.log(`metodos ${req.method}; URL:${req.url};`)

  return next()
})

function usersExists(req, res, next){
  if(!req.body.name){
    return res.status(400).json({ error: 'user not found'})
  }
  return next()
}
function checkUserInArray(req, res, next) {
  const user = users[req.params.index]
  if(!user){
    return res.status(400).json({ error: 'user not exists'})
  }
  req.user = user
  return next()
}



server.get('/users', (req, res) => {
  return(res.json(users))
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params
  return(res.json(req.user))
})

server.post('/users', usersExists, (req, res) =>{
  const { name } = req.body
  users.push(name)
  
  return res.json(users)
})

server.put('/users/:index', checkUserInArray, usersExists, (req, res) => {
  const { index } = req.params
  const { name } = req.body
  users[index] = name
  return res.json(users)
})

server.delete('/users/:index', checkUserInArray, (req,res) => {
  const { index } = req.params
  users.splice(index, 1)
  return res.send("item excluido")
})


server.listen(3000,)

