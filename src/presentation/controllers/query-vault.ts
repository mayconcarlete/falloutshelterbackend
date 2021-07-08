import { QueryVault } from '../../domain/usecases/query-vault'
import { ok, serverError } from '../helpers/http-responses'
import { IController } from '../interfaces/controller'
import { THttpRequest, THttpResponse } from '../types/http'

export class QueryVaultController implements IController {
  constructor (
    private readonly queryVaultUseCase: QueryVault,
    ) { }

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const { name, eyeColor, hairColor, age } = request.body

      const vault = await this.queryVaultUseCase.query({ name, eyeColor, hairColor, age })
      
      return ok(vault)
      
    } catch (error) {
      return serverError(error)
    }
  }
}
