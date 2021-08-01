import { GetDwellerByIdUseCase } from '../../../../data/usecases/get-dweller-by-id'
import { DwellerRepository } from '../../../../infra/mongodb/dweller-repository'
import { GetDwellerByIdController } from '../../../../presentation/controllers/get-dweller-by-id/get-dweller-by-id'
import { makeGetDwellerByIdValitors } from './make-validators'

export const makeGetDwellerByIdController = (): GetDwellerByIdController => {
  const validators = makeGetDwellerByIdValitors()

  const mongoRepository = new DwellerRepository()
  const getDwellerById = new GetDwellerByIdUseCase(mongoRepository)

  const getDwellerByIdController = new GetDwellerByIdController(validators, getDwellerById)
  return getDwellerByIdController
}
