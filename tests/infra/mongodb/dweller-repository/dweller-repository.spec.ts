import { MongoDB } from '../../../../src/infra/mongodb/helper'
import DwellerRepositoryModel from '../../../../src/infra/mongodb/models/dweller'
import { DwellerRepository } from '../../../../src/infra/mongodb/dweller-repository'
import { mockedDweller } from './mocks/dweller'

const makeSut = (): DwellerRepository => {
  return new DwellerRepository()
}

describe('DwellerRepository class', () => {
  const mongoDB = new MongoDB()
  beforeAll(async () => {
    await mongoDB.connect()
  })
  beforeEach(async () => {
    await DwellerRepositoryModel.deleteMany()
  })

  afterAll(async() => {
    await DwellerRepositoryModel.deleteMany()
    await mongoDB.disconnect()  
  })

  test('should return null when get method cant find dweller by id', async () => {
    const sut = makeSut()
    const id = 'invalid_id'
    const dweller = await sut.get(id)
    expect(dweller).toBe(null)
  })
  test('Should return a dweller when get method find a dweller by id', async () => {
    const sut = makeSut()
    const addDweller = await DwellerRepositoryModel.create(mockedDweller)
    const dweller = await sut.get(addDweller.id)
    expect(dweller!.id).toBeTruthy()
    expect(dweller!.name).toBe('MAYCON CARLETE')
    expect(dweller!.eyeColor).toBe('BROWN')
    expect(dweller!.hairColor).toBe('BROWN')
    expect(dweller!.age).toBe('1990-07-16')
  })
  test('Should return an empty array when query doesnt find dweller', async () => {
    const sut = makeSut()
    const queryParams = {
      name: 'invalid_value'
    }
    const dweller = await sut.query(queryParams)
    expect(dweller).toEqual([])
  })
  test('Should return an array with dwellers quering by params', async () => {
    const sut = makeSut()
    await DwellerRepositoryModel.create(mockedDweller)
    const queryParams = {
      name: 'MAYCON CARLETE'
    }
    const dweller = await sut.query(queryParams)
    expect(dweller[0].id).toBeTruthy()
    expect(dweller[0].name).toBe('MAYCON CARLETE')
    expect(dweller[0].eyeColor).toBe('BROWN')
    expect(dweller[0].hairColor).toBe('BROWN')
    expect(dweller[0].age).toBe('1990-07-16')
  })
  test('Should add dweller with success', async () => {
    const sut = makeSut()
    const dweller = await sut.add(mockedDweller)
    expect(dweller.id).toBeTruthy()
    expect(dweller.name).toBe('MAYCON CARLETE')
    expect(dweller.eyeColor).toBe('BROWN')
    expect(dweller.hairColor).toBe('BROWN')
    expect(dweller.age).toBe('1990-07-16')
  })
})
