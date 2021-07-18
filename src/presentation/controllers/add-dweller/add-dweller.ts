import {
  AddDweller,
  badRequest,
  CheckDateFormatError,
  IController,
  IValidate,
  ok,
  RequiredFieldError,
  serverError,
  THttpRequest,
  THttpResponse
}
  from './index'

export class AddDwellerController implements IController {
  constructor (
    private readonly validators: IValidate,
    private readonly addDwellerUseCase: AddDweller
  ) {}

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const body = request.body
      this.validators.validate(body)
      
      const { name, age, hairColor, eyeColor } = request.body
      const addDweller = await this.addDwellerUseCase.create({ name, age, hairColor, eyeColor })

      return ok(addDweller)
      
    } catch (error) {
      if (error instanceof RequiredFieldError || error instanceof TypeError || error instanceof CheckDateFormatError) return badRequest(error)
      return serverError(error)
    }
  }
}
