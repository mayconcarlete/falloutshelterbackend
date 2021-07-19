import express from 'express'
import { addDweller } from './routes/add-dweller'
import { getDwellerByIdRoute } from './routes/get-dweller-by-id'
import { queryDweller } from './routes/query-dweller'
import { moveTimeFoward } from './routes/move-time'
import { swaggerSetup } from './routes/swagger-route'

const app = express()

swaggerSetup(app)

app.use(express.json())

getDwellerByIdRoute(app)
addDweller(app)
queryDweller(app)
moveTimeFoward(app)

export default app
