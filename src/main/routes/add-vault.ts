import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { makeAddVaultController } from '../factories/controllers/add-vault/make-add-vault'

export const addVault = (app: Express): void => {
  const addVault = makeAddVaultController()
  app.post('/add-vault', adapterController(addVault))
}
