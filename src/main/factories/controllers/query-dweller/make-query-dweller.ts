import { ParseParamsUpper } from '../../../../data/helpers/parse-object-uppercase'
import { RemoveUndefinedParams } from '../../../../data/helpers/remove-undefined-params'
import { QueryDwellerUseCase } from '../../../../data/usecases/query-dweller'
import { DwellerRepository } from '../../../../infra/mongodb/dweller-repository'
import { QueryDwellerController } from '../../../../presentation/controllers/query-dweller/query-dweller'

export const makeQueryDwellerController = (): QueryDwellerController => {
  const fields = ['age', 'hairColor', 'eyeColor', 'name']
  const removeUndefinedParams = new RemoveUndefinedParams(fields)
  const parseParamsUpperCase = new ParseParamsUpper()
 
  const mongoRepository = new DwellerRepository()
  const queryDweller = new QueryDwellerUseCase(removeUndefinedParams, parseParamsUpperCase, mongoRepository)

  const queryDwellerController = new QueryDwellerController(queryDweller)

  return queryDwellerController
}
