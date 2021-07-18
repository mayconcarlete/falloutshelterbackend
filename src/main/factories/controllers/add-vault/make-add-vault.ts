import { AddDwellerUseCase } from '../../../../data/usecases/add-dweller'
import { VaultRepository } from '../../../../infra/mongodb/vault-repository'
import { AddDwellerController } from '../../../../presentation/controllers/add-dweller/add-dweller'
import { makeAddVaultValidators } from './make-validators'
// import { DynamoDbRepository } from '../../../infra/dynamodb/repository'

export const makeAddVaultController = (): AddDwellerController => {
  const validators = makeAddVaultValidators()

  // const config = {
  //   endpoint: 'http://localhost:8000',
  //   region: 'us-east-1',
  //   accessKeyId: 'DUMMY_ID',
  //   secretAccessKey: 'DUMMY_KEY'
  // }
  // const repository = new DynamoDbRepository(config)
  const mongoRepository = new VaultRepository()
  const addVaultUseCase = new AddDwellerUseCase(mongoRepository)
  const addVaultController = new AddDwellerController(validators, addVaultUseCase)
  return addVaultController
}
