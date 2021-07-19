import { 
  badRequest, 
  GetDwellerById, 
  IController, 
  IValidate, 
  notFound, 
  NotFoundError, 
  ok, 
  RequiredFieldError, 
  serverError, 
  THttpRequest, 
  THttpResponse 
} from './index'

export class GetDwellerByIdController implements IController {
  constructor (
    private readonly validators: IValidate,
    private readonly getDwellerByIdUseCase: GetDwellerById
  ) {}

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const params = request.params
      this.validators.validate(params)
      
      const id = params.id
      const dweller = await this.getDwellerByIdUseCase.getById(id)

      return ok(dweller)

    } catch (error) {
      if (error instanceof RequiredFieldError || error instanceof TypeError) return badRequest(error)
      else if (error instanceof NotFoundError) return notFound(error)
      return serverError(error)
    }
  }
}
