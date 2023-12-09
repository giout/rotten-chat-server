import 'dotenv/config'
import http from 'http'
import express from 'express'
import { config } from './socket'

// creating web server
const app = express()
const srv = http.createServer(app)
config(srv)

export default srv