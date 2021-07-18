import { MongoDB } from '../../../../src/infra/mongodb/helper'
import DwellerRepositoryModel from '../../../../src/infra/mongodb/models/dweller'
import { DwellerRepository } from '../../../../src/infra/mongodb/dweller-repository'
import { mockedVault } from './mocks/vault'

const makeSut = (): DwellerRepository => {
  return new DwellerRepository()
}

describe('VaultRepository class', () => {
  const mongoDB = new MongoDB()
  beforeAll(async () => {
    await mongoDB.connect()
  })
  beforeEach(async () => {
    DwellerRepositoryModel.deleteMany()
  })

  afterAll(async() => {
    await mongoDB.disconnect()  
  })

  test('should return null when get method cant find vault by id', async () => {
    const sut = makeSut()
    const id = 'invalid_id'
    const vault = await sut.get(id)
    expect(vault).toBe(null)
  })
  test('Should return a vault when get method find a vault by id', async () => {
    const sut = makeSut()
    const addVault = await DwellerRepositoryModel.create(mockedVault)
    const vault = await sut.get(addVault.id)
    expect(vault!.id).toBeTruthy()
    expect(vault!.name).toBe('MAYCON CARLETE')
    expect(vault!.eyeColor).toBe('BROWN')
    expect(vault!.hairColor).toBe('BROWN')
    expect(vault!.age).toBe('1990-07-16')
  })
  test('Should return an empty array when query doesnt find vault', async () => {
    const sut = makeSut()
    const queryParams = {
      name: 'invalid_value'
    }
    const vault = await sut.query(queryParams)
    expect(vault).toEqual([])
  })
  test('Should return an array with vaults quering by params', async () => {
    const sut = makeSut()
    await DwellerRepositoryModel.create(mockedVault)
    const queryParams = {
      name: 'MAYCON CARLETE'
    }
    const vault = await sut.query(queryParams)
    expect(vault[0].id).toBeTruthy()
    expect(vault[0].name).toBe('MAYCON CARLETE')
    expect(vault[0].eyeColor).toBe('BROWN')
    expect(vault[0].hairColor).toBe('BROWN')
    expect(vault[0].age).toBe('1990-07-16')
  })
  test('Should add vault with success', async () => {
    const sut = makeSut()
    const vault = await sut.add(mockedVault)
    expect(vault.id).toBeTruthy()
    expect(vault.name).toBe('MAYCON CARLETE')
    expect(vault.eyeColor).toBe('BROWN')
    expect(vault.hairColor).toBe('BROWN')
    expect(vault.age).toBe('1990-07-16')
  })
})
