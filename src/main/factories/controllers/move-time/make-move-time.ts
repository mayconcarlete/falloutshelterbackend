import { MoveTimeUseCase } from '../../../../data/usecases/add-time'
import { MoveTimeRepository } from '../../../../infra/mongodb/move-time-repository'
import { MoveTimeController } from '../../../../presentation/controllers/move-time'
import { makeMoveTimeValidators } from './make-validators'

export const makeMoveTimeController = (): MoveTimeController => {
  const validators = makeMoveTimeValidators()
  const moveTimeRepository = new MoveTimeRepository()
  const moveTimeUseCase = new MoveTimeUseCase(moveTimeRepository)
  const moveTimeController = new MoveTimeController(validators, moveTimeUseCase)

  return moveTimeController
}
