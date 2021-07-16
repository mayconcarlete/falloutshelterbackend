import express from 'express'
import { addVault } from './routes/add-vault'
import { getVaultByIdRoute } from './routes/get-vault-by-id'
import { queryVault } from './routes/query-vault'
import { moveTimeFoward } from './routes/move-time'

const app = express()
app.use(express.json())

getVaultByIdRoute(app)
addVault(app)
queryVault(app)
moveTimeFoward(app)

export default app
