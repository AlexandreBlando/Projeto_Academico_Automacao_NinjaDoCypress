const express = require('express')
const cors = require('cors')
const prisma = require('./prisma')
require('dotenv').config()

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress' })
})
/*
app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  // 🧩 Input validation
  if (!name) return res.status(400).json({ error: 'Name field is required.' })
  if (!email) return res.status(400).json({ error: 'Email field is required.' })
  if (!password) return res.status(400).json({ error: 'Password field is required.' })

  try {
    // 🔍 Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered.' })
    }

    // 🆕 Create a new user
    const user = await prisma.user.create({
      data: { name, email, password }
    })

    return res.status(201).json({
      message: 'User successfully registered.',
      user
    })
  } catch (error) {
    console.error('User registration error:', error)
    return res.status(500).json({ error: 'Internal server error during user registration.' })
  }
})
*/

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
})
