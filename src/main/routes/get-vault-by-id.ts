import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { makeGetVaultByIdController } from '../factories/controllers/get-vault-by-id/make-get-vault-by-id'
import { makeUpdateAgeDecorator } from '../factories/decorators/update-age-vault'

export const getVaultByIdRoute = (app: Express): void => {
  const getVaultByIdController = makeGetVaultByIdController()
  const decorator = makeUpdateAgeDecorator(getVaultByIdController)
  app.get('/get-vault-by-id/:id', adapterController(decorator))
}
