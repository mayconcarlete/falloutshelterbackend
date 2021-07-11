import { MoveTimeRepository } from '../../../../src/data/interfaces/vault/move-time-repository'
import { MoveTimeUseCase } from '../../../../src/data/usecases/move-time'
import { MoveTime } from '../../../../src/domain/usecases/move-time'
import { MockMoveTimeRepository } from './mocks/move-time-repository'

type SutTypes = {
  sut: MoveTime
  moveTimeRepository: MoveTimeRepository
}

const makeSut = (): SutTypes => {
  const moveTimeRepository = new MockMoveTimeRepository()
  const sut = new MoveTimeUseCase(moveTimeRepository)
  return { sut, moveTimeRepository }
}

describe('Db Move Time', () => {
  test('Should throw if moveTimeRepository throws', async () => {
    const { sut, moveTimeRepository } = makeSut()
    jest.spyOn(moveTimeRepository, 'move').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error('MoveTimeRepository throws')
      })
    })
    try {
      const date = 'valid_date'
      await sut.moveTime(date)
    } catch (error) {
      expect(error).toEqual(new Error('MoveTimeRepository throws'))
    }
  })
  test('Should return an valid date when moveDateRepository update new date', async () => {
    const { sut } = makeSut()
    const date = 'valid_date'
    const updatedDate = await sut.moveTime(date)
    expect(updatedDate).toEqual(date)
  })
})
