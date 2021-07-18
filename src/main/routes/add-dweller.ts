import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { makeAddDwellerController } from '../factories/controllers/add-dweller/make-add-dweller'

export const addDweller = (app: Express): void => {
  const addDweller = makeAddDwellerController()
  app.post('/add-dweller', adapterController(addDweller))
}
