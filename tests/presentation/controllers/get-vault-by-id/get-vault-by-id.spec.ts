import { GetVaultById } from '../../../../src/domain/usecases/get-vault-by-id'
import { GetVaultByIdController } from '../../../../src/presentation/controllers/get-vault-by-id'
import { NotFoundError } from '../../../../src/presentation/errors/not-found'
import { RequiredFieldError } from '../../../../src/presentation/errors/required-field'
import { IValidate } from '../../../../src/presentation/interfaces/validate'
import { THttpRequest } from '../../../../src/presentation/types/http'
import { MockGetVaultById } from './mocks/get-vault-by-id'
import { MockValidator } from './mocks/validator'

type SutTypes = {
  sut: GetVaultByIdController
  validators: IValidate
  getVaultById: GetVaultById
}

const makeSut = (): SutTypes => {
  const validators = new MockValidator()
  const getVaultById = new MockGetVaultById()
  const sut = new GetVaultByIdController(validators, getVaultById)
  return { sut, validators, getVaultById }
}

describe('GetVaultById Controller', () => {
  test('Should call getVaultByIdUseCase with correct params', async() => {
    const {sut, getVaultById} = makeSut()
    const getVaultSpy = jest.spyOn(getVaultById, 'getById')
    const request:THttpRequest = {
      params:{
        id: 'any_id'
      }
    }
    await sut.handle(request)
    expect(getVaultSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should return 400 when validation fails', async () => {
    const { sut, validators } = makeSut()
    jest.spyOn(validators, 'validate').mockImplementationOnce(() => {
      throw new RequiredFieldError('id')
    })

    const response = await sut.handle({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new RequiredFieldError('id'))
  })
  test('Should return 404 when id was not found', async () => {
    const { sut, getVaultById } = makeSut()
    jest.spyOn(getVaultById, 'getById').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new NotFoundError('cant found a vault')
      })
    })
    const request: THttpRequest = {
      params: { id: 'not_found_id' }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual(new NotFoundError('cant found a vault'))
  })
  test('Should return 500 and server error if getVaultId throws', async () => {
    const { sut, getVaultById } = makeSut()
    const request: THttpRequest = {
      params: { id: 'any_id' }
    }
    jest.spyOn(getVaultById, 'getById').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error('Something wrong')
      })
    })
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error('Something wrong'))
  })
})
