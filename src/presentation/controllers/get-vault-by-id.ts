import { GetVaultById } from '../../domain/usecases/get-vault-by-id'
import { NotFoundError } from '../errors/not-found'
import { RequiredFieldError } from '../errors/required-field'
import { badRequest, notFound, ok, serverError } from '../helpers/http-responses'
import { IController } from '../interfaces/controller'
import { IValidate } from '../interfaces/validate'
import { THttpRequest, THttpResponse } from '../types/http'

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
      const {time} = request
      const age = new Date(vault!.age)
      const getAge = new Date(request.time)
      const result = getAge.getTime() - age.getTime()
      console.log(Math.trunc(result/31536000000))

      return ok(vault)
    } catch (error) {
      if (error instanceof RequiredFieldError || error instanceof TypeError) return badRequest(error)
      else if (error instanceof NotFoundError) return notFound(error)
      return serverError(error)
    }
  }
}
