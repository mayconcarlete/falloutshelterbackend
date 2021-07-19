import { GetDwellerByIdUseCase } from '../../../../data/usecases/get-dweller-by-id'
import { DwellerRepository } from '../../../../infra/mongodb/dweller-repository'
import { GetDwellerByIdController } from '../../../../presentation/controllers/get-dweller-by-id/get-dweller-by-id'
import { makeGetDwellerByIdValitors } from './make-validators'

export const makeGetDwellerByIdController = (): GetDwellerByIdController => {
  const validators = makeGetDwellerByIdValitors()

  // const config = {
  //   endpoint: 'http://localhost:8000',
  //   region: 'us-east-1',
  //   accessKeyId: 'DUMMY_ID',
  //   secretAccessKey: 'DUMMY_KEY'
  // }
  // const repository = new DynamoDbRepository(config)
  const mongoRepository = new DwellerRepository()
  const getDwellerById = new GetDwellerByIdUseCase(mongoRepository)

  const getDwellerByIdController = new GetDwellerByIdController(validators, getDwellerById)
  return getDwellerByIdController
}
