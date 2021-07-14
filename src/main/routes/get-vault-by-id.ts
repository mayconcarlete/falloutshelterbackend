import { Express } from 'express'
import { GetTimeUseCase } from '../../data/usecases/get-time'
import { MoveTimeInfra } from '../../infra/mongodb/move-time'
import { UpdateAgeDecorator } from '../../presentation/decorators/age-vault'
import { adapterController } from '../adapters/controller'
import { adapterMiddleware } from '../adapters/middleware'
import { makeGetVaultByIdController } from '../factories/controllers/get-vault-by-id/make-get-vault-by-id'
import { makeGetTime } from '../factories/middlewares/get-current-time.ts/make-get-current-time'



export const getVaultByIdRoute = (app: Express): void => {
  const getTimeMiddleware = makeGetTime()
  const adaptMiddlewares = adapterMiddleware(getTimeMiddleware) 
  const getVaultByIdController = makeGetVaultByIdController()
  const getTimeRepository = new MoveTimeInfra()
  const getTimeUseCase = new GetTimeUseCase(getTimeRepository)
 
  const decorator = new UpdateAgeDecorator(getVaultByIdController, getTimeUseCase)
  app.get('/get-vault-by-id/:id', adapterController(decorator))
}
