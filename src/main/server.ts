import express from 'express'
import { addDweller } from './routes/add-dweller'
import { getVaultByIdRoute } from './routes/get-vault-by-id'
import { queryDweller } from './routes/query-vault'
import { moveTimeFoward } from './routes/move-time'
import { swaggerSetup } from './routes/swagger-route'

const app = express()

swaggerSetup(app)

app.use(express.json())

getVaultByIdRoute(app)
addDweller(app)
queryDweller(app)
moveTimeFoward(app)

export default app
