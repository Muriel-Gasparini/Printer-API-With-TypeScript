import express from 'express'
import config from '../config/vars'
import router from './routes'

const app = express()

app.use(express.json())

app.use('/', router)

app.listen(config.PORT)
