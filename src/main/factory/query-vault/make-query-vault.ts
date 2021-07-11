import { ParseParamsUpper } from '../../../data/helpers/parse-object-uppercase'
import { RemoveUndefinedParams } from '../../../data/helpers/remove-undefined-params'
import { DbQueryVault } from '../../../data/usecases/db-query-vault'
import { DynamoDbRepository } from '../../../infra/dynamodb/repository'
import { QueryVaultController } from '../../../presentation/controllers/query-vault'

export const makeQueryVaultController = (): QueryVaultController => {
  const removeUndefinedParams = new RemoveUndefinedParams()
  const parseParamsUpperCase = new ParseParamsUpper()
  const config = {
    endpoint: 'http://localhost:8000',
    region: 'us-east-1',
    accessKeyId: 'DUMMY_ID',
    secretAccessKey: 'DUMMY_KEY'
  }
  const mockRepository = new DynamoDbRepository(config)
  const queryVault = new DbQueryVault(removeUndefinedParams, parseParamsUpperCase, mockRepository)

  const queryVaultController = new QueryVaultController(queryVault)

  return queryVaultController
}
