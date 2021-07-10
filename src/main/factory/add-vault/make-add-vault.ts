import { DbAddVault } from '../../../data/usecases/db-add-vault'
import { MongoDBRepository } from '../../../infra/mongodb/repository'
import { AddVaultController } from '../../../presentation/controllers/add-vault'
import { makeAddVaultValidators } from './make-validators'
// import { DynamoDbRepository } from '../../../infra/dynamodb/repository'

export const makeAddVaultController = (): AddVaultController => {
  const validators = makeAddVaultValidators()

  // const config = {
  //   endpoint: 'http://localhost:8000',
  //   region: 'us-east-1',
  //   accessKeyId: 'DUMMY_ID',
  //   secretAccessKey: 'DUMMY_KEY'
  // }
  // const repository = new DynamoDbRepository(config)
  const mongoRepository = new MongoDBRepository()
  const addVaultUseCase = new DbAddVault(mongoRepository)
  const addVaultController = new AddVaultController(validators, addVaultUseCase)
  return addVaultController
}
