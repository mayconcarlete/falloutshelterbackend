import { ParseParamsUpper } from '../../../../data/helpers/parse-object-uppercase'
import { RemoveUndefinedParams } from '../../../../data/helpers/remove-undefined-params'
import { QueryVaultUseCase } from '../../../../data/usecases/query-vault'
import { VaultRepository } from '../../../../infra/mongodb/vault-repository'
import { QueryVaultController } from '../../../../presentation/controllers/query-vault/query-vault'

export const makeQueryVaultController = (): QueryVaultController => {
  const fields = ['age', 'hairColor', 'eyeColor', 'name']
  const removeUndefinedParams = new RemoveUndefinedParams(fields)
  const parseParamsUpperCase = new ParseParamsUpper()
  // const config = {
  //   endpoint: 'http://localhost:8000',
  //   region: 'us-east-1',
  //   accessKeyId: 'DUMMY_ID',
  //   secretAccessKey: 'DUMMY_KEY'
  // }
  // const mockRepository = new DynamoDbRepository(config)
  const mongoRepository = new VaultRepository()
  const queryVault = new QueryVaultUseCase(removeUndefinedParams, parseParamsUpperCase, mongoRepository)

  const queryVaultController = new QueryVaultController(queryVault)

  return queryVaultController
}
