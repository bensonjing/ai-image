import express from 'express'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'
import fs from 'fs'

dotenv.config()
const router = express.Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

router.route('/').get(async (req, res) => {
  // const image = await openai.images.generate({ prompt: 'A cute baby sea otter' })

  res.send('Hello from dalle')
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body
    const response = await openai.images.generate({ prompt: prompt, response_format: 'b64_json' })

    const image = response.data[0].b64_json

    res.status(200).json({ photo: image })
  } catch (error) {
    console.error(error)
    res.status(500).send(error?.response)
  }
})

export default router
