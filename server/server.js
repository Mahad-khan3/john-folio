import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong', time: new Date().toISOString() })
})

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB error:', err.message))
} else {
  console.log('MONGO_URI not set - skipping DB connection')
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})