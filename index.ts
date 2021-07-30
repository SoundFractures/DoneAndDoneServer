import { initDb } from './config/database'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// Controllers
import UserController from './src/controller/UserController'
import AuthController from './src/controller/AuthController'
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
const port = process.env.PORT || 8000

initDb(process.env.DB)

app.get('/', (req, res) => res.send('Express + TypeScript Server'))

// Routes
app.use('/api/user', UserController)
app.use('/api/auth', AuthController)

app.listen(port, () => {
  console.log(`⚡️ Server | Running on ${port}`)
})
