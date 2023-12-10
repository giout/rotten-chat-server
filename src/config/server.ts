import 'dotenv/config'
import http from 'http'
import express from 'express'
import { config } from './socket'
import cors from 'cors'

// creating web server
const app = express()
app.use(cors())

const srv = http.createServer(app)
config(srv)

export default srv