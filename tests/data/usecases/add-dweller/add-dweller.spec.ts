import { AddDwellerRepository } from '../../../../src/data/interfaces/dweller/add-dweller'
import { AddDwellerUseCase } from '../../../../src/data/usecases/add-dweller'
import { MockAddDwellerRepository } from './mocks/add-dweller-repository'
import { expectedResponse, dweller } from './mocks/constants'

type SutTypes = {
  sut: AddDwellerUseCase
  addDwellerRepository: AddDwellerRepository
}

const makeSut = (): SutTypes => {
  const addDwellerRepository = new MockAddDwellerRepository()
  const sut = new AddDwellerUseCase(addDwellerRepository)
  return { sut, addDwellerRepository }
}

describe('Db Add Dweller', () => {
  test('Should pass fields to uppercase', () => {
    const { sut } = makeSut()
    const dwellerUpperCase = sut.passFieldsToUpperCase(dweller)
    expect(dwellerUpperCase).toEqual(expectedResponse)
  })

  test('Should call addDwellerRepository with correct params', async () => {
    const { sut, addDwellerRepository } = makeSut()
    const addDwellerSpy = jest.spyOn(addDwellerRepository, 'add')
    await sut.create(dweller)
    expect(addDwellerSpy).toHaveBeenCalledWith(expectedResponse)
  })

  test('Should throw if addDwellerRepository throws', async () => {
    const { sut, addDwellerRepository } = makeSut()
    jest.spyOn(addDwellerRepository, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw Error('Repository error')
      })
    })
    await expect(sut.create(dweller)).rejects.toThrow()
  })

  test('Should return a new Dweller when addDwellerRepository is successful', async () => {
    const { sut } = makeSut()
    const newDweller = await sut.create(dweller)
    expect(newDweller).toEqual({ ...expectedResponse, id: 'valid_id' })
  })
})
