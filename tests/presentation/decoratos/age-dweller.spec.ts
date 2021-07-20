import { GetTime } from '../../../src/domain/usecases/get-time'
import { UpdateAgeDecorator } from '../../../src/presentation/decorators/age-dweller'
import { IController } from '../../../src/presentation/interfaces/controller'
import { THttpRequest } from '../../../src/presentation/types/http'
import { MockController } from './mocks/controller'
import { MockGetTime } from './mocks/time'

type SutTypes = {
  sut: UpdateAgeDecorator
  controller: IController
  time: GetTime
}

const makeSut = (): SutTypes => {
  const controller = new MockController()
  const time = new MockGetTime()
  const sut = new UpdateAgeDecorator(controller, time)
  return { sut, controller, time }
}

describe('UpdateAgeDecorator class', () => {
  test('Should return error if controller response is 4xx or 5xx', async () => {
    const { sut, controller } = makeSut()
    jest.spyOn(controller, 'handle').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        resolve({
          body: 'dummy_value',
          statusCode: 400
        })
      })
    })
    const request: THttpRequest = {
      time: 'valid_time'
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe('dummy_value')
  })
  test('Should return a parsed dweller with age updated when body is a single dweller', async () => {
    const { sut } = makeSut()
    const request: THttpRequest = {
      body: {
        id: 'valid_id'
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
    expect(response.body.age).toBe('29')
  })
  test('Should return a parsed array of dwellers with age update when body is an array of dwellers', async () => {
    const { sut, controller } = makeSut()
    const request: THttpRequest = {
      body: {
        hairColor: 'any_value'
      }
    }
    jest.spyOn(controller, 'handle').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        resolve({
          statusCode: 200,
          body: [
            {
              age: '1990-07-16',
              eyeColor: 'GREEN',
              hairColor: 'RED',
              name: 'MAYCON',
              id: 'valid_id_1'
            },
            {
              age: '1991-07-16',
              eyeColor: 'GREEN',
              hairColor: 'RED',
              name: 'CAROLINA',
              id: 'valid_id_2'
            }
          ]
        })
      })
    })
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([
      {
        age: '29',
        eyeColor: 'GREEN',
        hairColor: 'RED',
        name: 'MAYCON',
        id: 'valid_id_1'
      },
      {
        age: '28',
        eyeColor: 'GREEN',
        hairColor: 'RED',
        name: 'CAROLINA',
        id: 'valid_id_2'
      }
    ])
  })
})
