import { GetVaultByIdUseCase } from '../../../../data/usecases/get-vault-by-id'
import { DwellerRepository } from '../../../../infra/mongodb/dweller-repository'
import { GetVaultByIdController } from '../../../../presentation/controllers/get-vault-by-id/get-vault-by-id'
import { makeGetVaultByIdValitors } from './make-validators'

export const makeGetVaultByIdController = (): GetVaultByIdController => {
  const validators = makeGetVaultByIdValitors()

  // const config = {
  //   endpoint: 'http://localhost:8000',
  //   region: 'us-east-1',
  //   accessKeyId: 'DUMMY_ID',
  //   secretAccessKey: 'DUMMY_KEY'
  // }
  // const repository = new DynamoDbRepository(config)
  const mongoRepository = new DwellerRepository()
  const getVaultById = new GetVaultByIdUseCase(mongoRepository)

  const getVaultByIdController = new GetVaultByIdController(validators, getVaultById)
  return getVaultByIdController
}
