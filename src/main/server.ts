import express, {Request, Response} from 'express'
import { DynamoDbRepository } from '../infra/dynamodb/repository'
import { addVault } from './routes/add-vault'
import {getVaultByIdRoute} from './routes/get-vault-by-id'

const app = express()
app.use(express.json())

getVaultByIdRoute(app)
addVault(app)


export default app