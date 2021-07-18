import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { makeAddDwellerController } from '../factories/controllers/add-dweller/make-add-dweller'

export const addVault = (app: Express): void => {
  const addVault = makeAddDwellerController()
  app.post('/add-vault', adapterController(addVault))
}
