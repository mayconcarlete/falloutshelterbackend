import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { makeQueryVaultController } from '../factories/controllers/query-vault/make-query-vault'
import { makeUpdateAgeDecorator } from '../factories/decorators/update-age-vault'

export const queryVault = (app: Express): void => {
  const makeQueryController = makeQueryVaultController()
  const updateAgeDecorator = makeUpdateAgeDecorator(makeQueryController)
  app.post('/query-vault', adapterController(updateAgeDecorator))
}
