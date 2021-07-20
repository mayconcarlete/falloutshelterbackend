import { QueryDweller } from '../../../../src/domain/usecases/query-dweller'
import { QueryDwellerController } from '../../../../src/presentation/controllers/query-dweller/query-dweller'
import { THttpRequest } from '../../../../src/presentation/types/http'
import { MockQueryDweller } from './mocks/query-dweller'

type SutTypes = {
  sut: QueryDwellerController
  queryDwellerUseCase: QueryDweller
}

const makeSut = (): SutTypes => {
  const queryDwellerUseCase = new MockQueryDweller()
  const sut = new QueryDwellerController(queryDwellerUseCase)
  return { sut, queryDwellerUseCase }
}

describe('Query Dweller', () => {
  test('Should call queryDwellerUseCase with correct params', async () => {
    const { sut, queryDwellerUseCase } = makeSut()
    const request: THttpRequest = {
      time: 'any_value',
      params: 'valid_id',
      body: {
        name: 'valid_name',
        age: 'valid_age',
        hairColor: 'valid_hair_color',
        eyeColor: 'valid_eye_color'
      }
    }
    const queryDwellerSpy = jest.spyOn(queryDwellerUseCase, 'query')
    await sut.handle(request)
    expect(queryDwellerSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      age: 'valid_age',
      hairColor: 'valid_hair_color',
      eyeColor: 'valid_eye_color'
    })
  })
  test('Should return ServerError if queryDwellerUseCase throws', async () => {
    const { sut, queryDwellerUseCase } = makeSut()
    jest.spyOn(queryDwellerUseCase, 'query').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error('server throws')
      })
    })
    const request: THttpRequest = {
      time: 'any_value',
      params: 'valid_id',
      body: {
        name: 'valid_name',
        age: 'valid_age',
        hairColor: 'valid_hair_color',
        eyeColor: 'valid_eye_color'
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error('server throws'))
  })
  test('Should return 200 and array of dweller if query was success', async () => {
    const { sut } = makeSut()
    const request: THttpRequest = {
      time: 'any_value',
      params: 'valid_id',
      body: {
        name: 'valid_name',
        age: 'valid_age',
        hairColor: 'valid_hair_color',
        eyeColor: 'valid_eye_color'
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([{
      id: 'valid_id',
      age: 'VALID_AGE',
      eyeColor: 'VALID_EYE_COLOR',
      hairColor: 'VALID_HAIR_COLOR',
      name: 'VALID_NAME'
    }])
  })
})
