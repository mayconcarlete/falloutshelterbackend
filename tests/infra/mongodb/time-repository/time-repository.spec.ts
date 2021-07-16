import { MongoDB } from '../../../../src/infra/mongodb/helper'
import TimeRepository from '../../../../src/infra/mongodb/models/time'
import { MoveTimeRepository } from '../../../../src/infra/mongodb/move-time-repository'
import { mockedTime } from './mocks/time'

describe('MoveTimeInfra class', () => {
  beforeAll(async () => {
    const mongoDB = new MongoDB()
    await mongoDB.connect()
  })
  beforeEach(async () => {
    await TimeRepository.deleteMany()
  })

  test('Should return a time from Database when time already exists in DB', async () => {
    const sut = new MoveTimeRepository()
    await TimeRepository.create(mockedTime)
    const getTime = await sut.get()
    expect(getTime.time).toBe('2021-01-01')
    expect(getTime.id).toBeTruthy()
  })

  test('Should return a default system date when doesnt exists time in DB', async () => {
    const sut = new MoveTimeRepository()
    const getTime = await sut.get()
    expect(new Date(getTime.time)).toBeTruthy()
    expect(getTime.id).toBeTruthy()
  })
})
