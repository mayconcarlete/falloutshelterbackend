import express, {Request, Response} from 'express'
import { makeCreate } from './create-route'
import {getVaultByIdRoute} from './routes/get-vault-by-id'
const app = express()

app.use(express.json())

getVaultByIdRoute(app)



export default app