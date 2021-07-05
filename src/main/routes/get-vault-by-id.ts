import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { makeGetVaultByIdController } from '../factory/get-vault-by-id/make-get-vault-by-id'

export const getVaultByIdRoute = (app: Express): void => {
  const getVaultByIdController = makeGetVaultByIdController()
  app.get('/get-vault-by-id/:id', adapterController(getVaultByIdController))
}
