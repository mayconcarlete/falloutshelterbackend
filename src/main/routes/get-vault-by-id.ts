import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { adapterMiddleware } from '../adapters/middleware'
import { makeGetVaultByIdController } from '../factories/controllers/get-vault-by-id/make-get-vault-by-id'
import { makeGetTime } from '../factories/middlewares/get-current-time.ts/make-get-current-time'



export const getVaultByIdRoute = (app: Express): void => {
  const getTimeMiddleware = makeGetTime()
  const adaptMiddlewares = adapterMiddleware(getTimeMiddleware) 
  const getVaultByIdController = makeGetVaultByIdController()
  app.get('/get-vault-by-id/:id', adaptMiddlewares ,adapterController(getVaultByIdController))
}
