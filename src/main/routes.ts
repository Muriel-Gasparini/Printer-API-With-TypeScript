import { Router } from 'express'
import printerController from './controllers/printController'

const router = Router()

router.post('/print', printerController)

router.get('/', (req, res) => {
  res.send('mande sua url por uma requisição POST para o endpoint /print. E não se esqueça da URL no body em formato JSON, exemplo de um body correto: { "url": "https://google.com" } *OBS precisa do protocolo http especificado na url :)')
})

export default router
