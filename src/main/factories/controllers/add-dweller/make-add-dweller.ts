import { AddDwellerUseCase } from '../../../../data/usecases/add-dweller'
import { DwellerRepository } from '../../../../infra/mongodb/dweller-repository'
import { AddDwellerController } from '../../../../presentation/controllers/add-dweller/add-dweller'
import { makeAddDwellerValidators } from './make-validators'
// import { DynamoDbRepository } from '../../../infra/dynamodb/repository'

export const makeAddDwellerController = (): AddDwellerController => {
  const validators = makeAddDwellerValidators()

  // To add Dynamodb as Database
  // const config = {
  //   endpoint: 'http://localhost:8000',
  //   region: 'us-east-1',
  //   accessKeyId: 'DUMMY_ID',
  //   secretAccessKey: 'DUMMY_KEY'
  // }
  // const repository = new DynamoDbRepository(config)

  const mongoRepository = new DwellerRepository()
  const addDwellerUseCase = new AddDwellerUseCase(mongoRepository)
  const addDwellerController = new AddDwellerController(validators, addDwellerUseCase)
  return addDwellerController
}
