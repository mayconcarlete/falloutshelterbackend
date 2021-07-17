import { 
  badRequest, 
  CheckDateFormatError, 
  IController, 
  IValidate, 
  MoveTime, 
  ok, 
  RequiredFieldError, 
  serverError, 
  THttpRequest, 
  THttpResponse 
} from './index'

export class MoveTimeController implements IController {
  constructor (
    private readonly validators: IValidate,
    private readonly moveTimeUseCase: MoveTime
  ) {}

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const body = request.body
      this.validators.validate(body)
      const { time } = request.body
      const moveTime = await this.moveTimeUseCase.moveTime({ time })
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
