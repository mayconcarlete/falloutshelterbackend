import { AddVault } from '../../domain/usecases/add-vault'
import { RequiredFieldError } from '../errors/required-field'
import { ServerError } from '../errors/server-error'
import { badRequest, ok, serverError } from '../helpers/http-responses'
import { IController } from '../interfaces/controller'
import { IValidate } from '../interfaces/validate'
import { THttpRequest, THttpResponse } from '../types/http'

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
      if (error instanceof RequiredFieldError || error instanceof TypeError) return badRequest(error)
      else if (error instanceof ServerError) return serverError(error)
      return serverError(error)
    }
  }
}
