import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { makeQueryDwellerController } from '../factories/controllers/query-dweller/make-query-dweller'
import { makeUpdateAgeDecorator } from '../factories/decorators/update-age-dweller'

export const queryDweller = (app: Express): void => {
  const makeQueryController = makeQueryDwellerController()
  const updateAgeDecorator = makeUpdateAgeDecorator(makeQueryController)
  app.post('/query-dweller', adapterController(updateAgeDecorator))
}
