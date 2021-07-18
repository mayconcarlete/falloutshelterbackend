import express from 'express'
import { addDweller } from './routes/add-dweller'
import { getVaultByIdRoute } from './routes/get-vault-by-id'
import { queryVault } from './routes/query-vault'
import { moveTimeFoward } from './routes/move-time'
import { swaggerSetup } from './routes/swagger-route'

const app = express()

swaggerSetup(app)

app.use(express.json())

getVaultByIdRoute(app)
addDweller(app)
queryVault(app)
moveTimeFoward(app)

export default app
