import { Dweller } from '../../domain/models/dweller'
import { QueryVault } from '../../domain/usecases/query-vault'
import { ParseParamsUpper } from '../helpers/parse-object-uppercase'
import { RemoveParams } from '../interfaces/helpers/remove-undefined-params'
import { QueryVaultRepository } from '../interfaces/vault/query-vault'

export class QueryVaultUseCase implements QueryVault {
  constructor (
    private readonly removeUndefinedParams: RemoveParams,
    private readonly parseParamsUpperCase: ParseParamsUpper,
    private readonly queryVaultRepository: QueryVaultRepository
  ) {}

  async query (vaultParams: Dweller): Promise<Dweller[]> {
    const paramsToQuery = this.removeUndefinedParams.remove(vaultParams)
    const paramsToUpperCase = this.parseParamsUpperCase.parse(paramsToQuery)
    const vaultList = await this.queryVaultRepository.query(paramsToUpperCase)
    return vaultList
  }
}
