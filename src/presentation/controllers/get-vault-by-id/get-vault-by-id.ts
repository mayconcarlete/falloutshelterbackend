import { 
  badRequest, 
  GetVaultById, 
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

export class GetVaultByIdController implements IController {
  constructor (
    private readonly validators: IValidate,
    private readonly getVaultByIdUseCase: GetVaultById
  ) {}

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const params = request.params
      this.validators.validate(params)
      const id = params.id
      const vault = await this.getVaultByIdUseCase.getById(id)

      return ok(vault)
    } catch (error) {
      if (error instanceof RequiredFieldError || error instanceof TypeError) return badRequest(error)
      else if (error instanceof NotFoundError) return notFound(error)
      return serverError(error)
    }
  }
}
