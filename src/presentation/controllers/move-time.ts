import { MoveTime } from '../../domain/usecases/move-time'
import { CheckDateFormatError } from '../errors/check-date-format'
import { RequiredFieldError } from '../errors/required-field'
import { badRequest, ok, serverError } from '../helpers/http-responses'
import { IController } from '../interfaces/controller'
import { IValidate } from '../interfaces/validate'
import { THttpRequest, THttpResponse } from '../types/http'

export class MoveTimeController implements IController {
  constructor (
    private readonly validators: IValidate,
    private readonly moveTimeUseCase: MoveTime
  ) {}

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const body = request.body
      this.validators.validate(body)
      const { date } = request.body
      const moveTime = await this.moveTimeUseCase.moveTime(date)
      return ok(moveTime)
    } catch (error) {
      if (error instanceof RequiredFieldError ||
                error instanceof TypeError ||
                error instanceof CheckDateFormatError
      ) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
