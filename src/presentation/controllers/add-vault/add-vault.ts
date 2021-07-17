import {
  AddVault,
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

export class AddVaultController implements IController {
  constructor (
    private readonly validators: IValidate,
    private readonly addVaultUseCase: AddVault
  ) {}

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const body = request.body
      this.validators.validate(body)

      const { name, age, hairColor, eyeColor } = request.body
      const addVault = await this.addVaultUseCase.create({ name, age, hairColor, eyeColor })

      return ok(addVault)
    } catch (error) {
      if (error instanceof RequiredFieldError || error instanceof TypeError || error instanceof CheckDateFormatError) return badRequest(error)
      return serverError(error)
    }
  }
}
