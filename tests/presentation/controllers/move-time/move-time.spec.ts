import { MoveTimeController } from '../../../../src/presentation/controllers/move-time'
import { CheckDateFormatError } from '../../../../src/presentation/errors/check-date-format'
import { IValidate } from '../../../../src/presentation/interfaces/validate'
import { THttpRequest } from '../../../../src/presentation/types/http'
import { MockMoveTime } from './mocks/move-time'
import { MockValidator } from './mocks/validate'

type SutTypes = {
  sut: MoveTimeController
  validators: IValidate
  moveTimeUseCase: MockMoveTime
}

const makeSut = (): SutTypes => {
  const validators = new MockValidator()
  const moveTimeUseCase = new MockMoveTime()
  const sut = new MoveTimeController(validators, moveTimeUseCase)
  return { sut, validators, moveTimeUseCase }
}

describe('Move Time Controllers', () => {
  test('Should throw in a bad request if validation fails', async () => {
    const { sut, validators } = makeSut()
    jest.spyOn(validators, 'validate').mockImplementationOnce(() => {
      throw new CheckDateFormatError()
    })
    const request: THttpRequest = {
      time: 'any_value',
      body: {
        invalid_field: 'any_value'
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(new CheckDateFormatError())
  })
  test('Should call moveTimeUseCase with correct params', async () => {
    const { sut, moveTimeUseCase } = makeSut()
    const moveTimeSpy = jest.spyOn(moveTimeUseCase, 'moveTime')
    const request: THttpRequest = {
      time: 'any_value',
      body: {
        time: 'any_date'
      }
    }
    await sut.handle(request)
    expect(moveTimeSpy).toHaveBeenLastCalledWith({ time: 'any_date' })
  })
  test('Should return a Server Error and status 500 if moveTimeUseCase throws', async () => {
    const { sut, moveTimeUseCase } = makeSut()
    jest.spyOn(moveTimeUseCase, 'moveTime').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error('Server Error')
      })
    })
    const request: THttpRequest = {
      time: 'any_value',
      body: {
        time: 'valid_value'
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error('Server Error'))
  })
  test('Should return a new date when moveTimeUseCase create a new date', async () => {
    const { sut } = makeSut()
    const request: THttpRequest = {
      time: 'any_value',
      body: {
        time: 'valid_date'
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ id: 'valid_id', time: 'valid_date' })
  })
})
