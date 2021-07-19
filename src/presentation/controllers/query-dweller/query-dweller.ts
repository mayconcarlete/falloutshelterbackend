import { 
  IController, 
  ok, 
  QueryDweller, 
  serverError, 
  THttpRequest, 
  THttpResponse 
} from './index'

export class QueryDwellerController implements IController {
  constructor (
    private readonly queryDwellerUseCase: QueryDweller
  ) { }

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const { name, eyeColor, hairColor, age } = request.body

      const dweller = await this.queryDwellerUseCase.query({ name, eyeColor, hairColor, age })

      return ok(dweller)
      
    } catch (error) {
      return serverError(error)
    }
  }
}
