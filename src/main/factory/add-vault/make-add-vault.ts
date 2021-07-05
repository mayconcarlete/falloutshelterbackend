import { DbAddVault } from '../../../data/usecases/db-add-vault'
import { DynamoDbRepository } from '../../../infra/dynamodb/repository'
import { AddVaultController } from '../../../presentation/controllers/add-vault'
import { makeAddVaultValidators } from './make-validators'

export const makeAddVaultController = (): AddVaultController => {
  const validators = makeAddVaultValidators()

  const config = {
    endpoint: 'http://localhost:8000',
    region: 'us-east-1',
    accessKeyId: 'DUMMY_ID',
    secretAccessKey: 'DUMMY_KEY'
  }
  const repository = new DynamoDbRepository(config)
  const addVaultUseCase = new DbAddVault(repository)
  const addVaultController = new AddVaultController(validators, addVaultUseCase)
  return addVaultController
}
