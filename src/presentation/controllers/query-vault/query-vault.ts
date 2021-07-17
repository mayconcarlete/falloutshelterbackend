import { 
  IController, 
  ok, 
  QueryVault, 
  serverError, 
  THttpRequest, 
  THttpResponse 
} from './index'

export class QueryVaultController implements IController {
  constructor (
    private readonly queryVaultUseCase: QueryVault
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
