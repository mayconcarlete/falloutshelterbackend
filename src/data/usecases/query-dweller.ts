import { Dweller } from '../../domain/models/dweller'
import { QueryDweller } from '../../domain/usecases/query-dweller'
import { ParseParamsUpper } from '../helpers/parse-object-uppercase'
import { RemoveParams } from '../interfaces/helpers/remove-undefined-params'
import { QueryDwellerRepository } from '../interfaces/dweller/query-dweller'

export class QueryDwellerUseCase implements QueryDweller {
  constructor (
    private readonly removeUndefinedParams: RemoveParams,
    private readonly parseParamsUpperCase: ParseParamsUpper,
    private readonly queryDwellerRepository: QueryDwellerRepository
  ) {}

  async query (dwellerParams: Dweller): Promise<Dweller[]> {
    const paramsToQuery = this.removeUndefinedParams.remove(dwellerParams)
    const paramsToUpperCase = this.parseParamsUpperCase.parse(paramsToQuery)
    const dwellerList = await this.queryDwellerRepository.query(paramsToUpperCase)
    return dwellerList
  }
}
