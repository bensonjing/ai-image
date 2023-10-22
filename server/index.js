import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import PostRoutes from './routes/postRoutes.js'
import DalleRoutes from './routes/dalleRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/post', PostRoutes)
app.use('/dalle', DalleRoutes)

app.get('/', async (req, res) => {
  res.send('Hello, World!')
})

const startServer = async () => {

  try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
  } catch (err) {
    console.error(err)
  }

}

startServer()
