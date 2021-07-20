import { GetDwellerById } from '../../../../src/domain/usecases/get-dweller-by-id'
import { GetDwellerByIdController } from '../../../../src/presentation/controllers/get-dweller-by-id/get-dweller-by-id'
import { NotFoundError } from '../../../../src/presentation/errors/not-found'
import { RequiredFieldError } from '../../../../src/presentation/errors/required-field'
import { IValidate } from '../../../../src/presentation/interfaces/validate'
import { THttpRequest } from '../../../../src/presentation/types/http'
import { MockGetDwellerById } from './mocks/get-dweller-by-id'
import { MockValidator } from './mocks/validator'

type SutTypes = {
  sut: GetDwellerByIdController
  validators: IValidate
  getDwellerById: GetDwellerById
}

const makeSut = (): SutTypes => {
  const validators = new MockValidator()
  const getDwellerById = new MockGetDwellerById()
  const sut = new GetDwellerByIdController(validators, getDwellerById)
  return { sut, validators, getDwellerById }
}

describe('GetDwellerById Controller', () => {
  test('Should call getDwellerByIdUseCase with correct params', async () => {
    const { sut, getDwellerById } = makeSut()
    const getDwellerSpy = jest.spyOn(getDwellerById, 'getById')
    const request: THttpRequest = {
      time: 'any_value',
      params: {
        id: 'any_id'
      }
    }
    await sut.handle(request)
    expect(getDwellerSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should return 400 when validation fails', async () => {
    const { sut, validators } = makeSut()
    jest.spyOn(validators, 'validate').mockImplementationOnce(() => {
      throw new RequiredFieldError('id')
    })

    const response = await sut.handle({ time: 'any' })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new RequiredFieldError('id'))
  })
  test('Should return 404 when id was not found', async () => {
    const { sut, getDwellerById } = makeSut()
    jest.spyOn(getDwellerById, 'getById').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new NotFoundError('cant found a dweller')
      })
    })
    const request: THttpRequest = {
      time: 'any_value',
      params: { id: 'not_found_id' }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual(new NotFoundError('cant found a dweller'))
  })
  test('Should return 500 and server error if getDwellerId throws', async () => {
    const { sut, getDwellerById } = makeSut()
    const request: THttpRequest = {
      time: 'any_value',
      params: { id: 'any_id' }
    }
    jest.spyOn(getDwellerById, 'getById').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error('Something wrong')
      })
    })
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error('Something wrong'))
  })
  test('Should return 200 when get dweller with success', async () => {
    const { sut } = makeSut()
    const request: THttpRequest = {
      time: 'any_value',
      params: {
        id: 'valid_id'
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: 'valid_id',
      name: 'MAYCON',
      age: '2020-6-02',
      eyeColor: 'BROWN',
      hairColor: 'BROWN'
    })
  })
})
