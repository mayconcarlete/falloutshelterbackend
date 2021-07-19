import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { makeGetDwellerByIdController } from '../factories/controllers/get-dweller-by-id/make-get-dweller-by-id'
import { makeUpdateAgeDecorator } from '../factories/decorators/update-age-vault'

export const getDwellerByIdRoute = (app: Express): void => {
  const getDwellerByIdController = makeGetDwellerByIdController()
  const decorator = makeUpdateAgeDecorator(getDwellerByIdController)
  app.get('/get-dweller-by-id/:id', adapterController(decorator))
}
