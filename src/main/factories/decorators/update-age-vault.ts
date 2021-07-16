import { GetTimeUseCase } from '../../../data/usecases/get-time'
import { MoveTimeRepository } from '../../../infra/mongodb/move-time-repository'
import { UpdateAgeDecorator } from '../../../presentation/decorators/age-vault'
import { IController } from '../../../presentation/interfaces/controller'

export const makeUpdateAgeDecorator = (controller: IController): IController => {
  const getTimeRepository = new MoveTimeRepository()
  const getTimeUseCase = new GetTimeUseCase(getTimeRepository)
  const updateAgeDecorator = new UpdateAgeDecorator(controller, getTimeUseCase)
  return updateAgeDecorator
}
