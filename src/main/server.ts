import express from 'express'
import config from '../config/vars'

const app = express()

app.listen(config.PORT)
