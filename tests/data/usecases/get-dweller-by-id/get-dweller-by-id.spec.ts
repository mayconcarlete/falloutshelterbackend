import { GetDwellerByIdRepository } from '../../../../src/data/interfaces/dweller/get-dweller-by-id'
import { GetDwellerByIdUseCase } from '../../../../src/data/usecases/get-dweller-by-id'
import { NotFoundError } from '../../../../src/presentation/errors/not-found'
import { dweller } from './mocks/constants'
import { MockGetByIdRepository } from './mocks/get-dweller-repository'

type SutTypes = {
  sut: GetDwellerByIdUseCase
  getDwellerRepository: GetDwellerByIdRepository
}

const makeSut = (): SutTypes => {
  const getDwellerRepository = new MockGetByIdRepository()
  const sut = new GetDwellerByIdUseCase(getDwellerRepository)
  return { sut, getDwellerRepository }
}

describe('Db Get Dweller By Id', () => {
  test('ensure getById is called with carrect params', async () => {
    const { sut } = makeSut()
    const sutSpy = jest.spyOn(sut, 'getById')
    const id = 'any_id'
    await sut.getById(id)
    expect(sutSpy).toHaveBeenCalledWith(id)
  })
  test('Should throw when getDwellertRepository throws', async () => {
    const { sut, getDwellerRepository } = makeSut()
    const id = 'any_id'
    jest.spyOn(getDwellerRepository, 'get').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error()
      })
    })
    await expect(sut.getById(id)).rejects.toThrow()
  })
  test('Should throw NotFoundError when dweller are not found', async () => {
    const { sut, getDwellerRepository } = makeSut()
    const id = 'invalid_id'
    jest.spyOn(getDwellerRepository, 'get').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        resolve(null)
      })
    })
    try {
      await sut.getById(id)
    } catch (error) {
      expect(error).toEqual(new NotFoundError('cant found a dweller'))
    }
  })
  test('ensure getGetById return a dweller when find by id', async () => {
    const { sut } = makeSut()
    const id = 'valid_id'
    const getDweller = await sut.getById(id)
    expect(getDweller).toEqual(dweller)
  })
})
