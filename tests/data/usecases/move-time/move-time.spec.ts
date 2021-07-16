import { AddTimeRepository } from '../../../../src/data/interfaces/time/add-time'
import { MoveTimeUseCase } from '../../../../src/data/usecases/add-time'
import { MoveTime } from '../../../../src/domain/usecases/move-time'
import { MockMoveTimeRepository } from './mocks/move-time-repository'

type SutTypes = {
  sut: MoveTime
  moveTimeRepository: AddTimeRepository
}

const makeSut = (): SutTypes => {
  const moveTimeRepository = new MockMoveTimeRepository()
  const sut = new MoveTimeUseCase(moveTimeRepository)
  return { sut, moveTimeRepository }
}

describe('Db Move Time', () => {
  test('Should throw if moveTimeRepository throws', async () => {
    const { sut, moveTimeRepository } = makeSut()
    jest.spyOn(moveTimeRepository, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error('MoveTimeRepository throws')
      })
    })
    try {
      const date = 'valid_date'
      await sut.moveTime({ time: date })
    } catch (error) {
      expect(error).toEqual(new Error('MoveTimeRepository throws'))
    }
  })
  test('Should return an valid date when moveDateRepository update new date', async () => {
    const { sut } = makeSut()
    const date = 'valid_date'
    const updatedDate = await sut.moveTime({ time: date })
    expect(updatedDate).toEqual({
      id: 'valid_id',
      time: 'valid_time'
    })
  })
})
