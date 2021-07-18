import { AddDweller } from '../../../../src/domain/usecases/add-dweller'
import { AddDwellerController } from '../../../../src/presentation/controllers/add-dweller/add-dweller'
import { ServerError } from '../../../../src/presentation/errors/server-error'
import { IValidate } from '../../../../src/presentation/interfaces/validate'
import { THttpRequest } from '../../../../src/presentation/types/http'
import { MockAddVault } from './mocks/add-vault'
import { MockValidator } from './mocks/validator'

type SutTypes = {
  sut: AddDwellerController
  validator: IValidate
  addVaultUseCase: AddDweller
}

const request: THttpRequest = {
  time: 'any_value',
  body: {
    name: 'valid_name',
    age: 1,
    hairColor: 'valid_hair_color',
    eyeColor: 'valid_eye_color'
  }
}

const makeSut = (): SutTypes => {
  const validator = new MockValidator()
  const addVaultUseCase = new MockAddVault()
  const sut = new AddDwellerController(validator, addVaultUseCase)
  return { sut, validator, addVaultUseCase }
}

describe('Add Vault Controller', () => {
  test('Should return a 500 server error when server throw', async () => {
    const { sut, addVaultUseCase } = makeSut()
    jest.spyOn(addVaultUseCase, 'create').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new ServerError()
      })
    })
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  test('Should return bad request when validation fails', async () => {
    const { sut, validator } = makeSut()
    jest.spyOn(validator, 'validate').mockImplementationOnce(() => {
      throw TypeError('any_field')
    })
    const request: THttpRequest = {
      time: 'any_value',
      body: {
        any_field: 'invalid_value'
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new TypeError('any_field'))
  })
  test('Should return 200 when add vault with success', async () => {
    const { sut } = makeSut()
    const expectedResponse = {
      age: '2020-6-02',
      eyeColor: 'BROWN',
      name: 'MAYCON',
      hairColor: 'BROWN'
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ ...expectedResponse, id: 'valid_id' })
  })
})
