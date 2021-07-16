import { GetTimeRepository } from '../../../../src/data/interfaces/time/get-time'
import { GetTimeUseCase } from '../../../../src/data/usecases/get-time'
import { MockGetTimeRepository } from './mocks/get-time-repository'

type SutTypes ={
  sut: GetTimeUseCase
  getTimeRepository: GetTimeRepository
}

const makeSut = (): SutTypes => {
  const getTimeRepository = new MockGetTimeRepository()
  const sut = new GetTimeUseCase(getTimeRepository)
  return { sut, getTimeRepository }
}

describe('GetTimeUseCase class', () => {
  test('Should throw if getTimeRepository throws', async () => {
    const { sut, getTimeRepository } = makeSut()
    jest.spyOn(getTimeRepository, 'get').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error()
      })
    })
    try {
      await sut.getTime()
    } catch (error) {
      expect(error).toEqual(new Error())
    }
  })
  test('Should return a TimeFoward when query is succeesful', async () => {
    const { sut } = makeSut()
    const time = await sut.getTime()
    expect(time).toEqual({
      id: 'valid_id',
      time: '2021-01-01'
    })
  })
})
