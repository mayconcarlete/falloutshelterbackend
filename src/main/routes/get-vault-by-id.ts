import { Express } from 'express'
import { TimeFoward } from '../../domain/models/time'
import { LoadTimeUseCase } from '../../domain/usecases/load-time'
import { GetCurrentTimeMiddleware } from '../../presentation/middlewares/get-current-time'
import { adapterController } from '../adapters/controller'
import { adapterMiddleware } from '../adapters/middleware'
import { makeGetVaultByIdController } from '../factories/controllers/get-vault-by-id/make-get-vault-by-id'

class LoadTime implements LoadTimeUseCase{
  getTime(): Promise<TimeFoward> {
    return new Promise((resolve, reject)=>{
      resolve({
        id:'valid-id',
        time:'2021-06-01'
      })
    })
  }
}

export const getVaultByIdRoute = (app: Express): void => {
  const loadTime = new LoadTime()
  const updateAgeMiddleware = new GetCurrentTimeMiddleware(loadTime)
  const adaptMiddlewares = adapterMiddleware(updateAgeMiddleware) 
  const getVaultByIdController = makeGetVaultByIdController()
  app.get('/get-vault-by-id/:id', adaptMiddlewares ,adapterController(getVaultByIdController))
}
