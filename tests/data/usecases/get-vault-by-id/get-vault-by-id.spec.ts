import { GetDwellerByIdRepository } from '../../../../src/data/interfaces/dweller/get-dweller-by-id'
import { GetDwellerByIdUseCase } from '../../../../src/data/usecases/get-dweller-by-id'
import { NotFoundError } from '../../../../src/presentation/errors/not-found'
import { vault } from './mocks/constants'
import { MockGetByIdRepository } from './mocks/get-vault-repository'

type SutTypes = {
  sut: GetDwellerByIdUseCase
  getVaultRepository: GetDwellerByIdRepository
}

const makeSut = (): SutTypes => {
  const getVaultRepository = new MockGetByIdRepository()
  const sut = new GetDwellerByIdUseCase(getVaultRepository)
  return { sut, getVaultRepository }
}

describe('Db Get Vault By Id', () => {
  test('ensure getById is called with carrect params', async () => {
    const { sut } = makeSut()
    const sutSpy = jest.spyOn(sut, 'getById')
    const id = 'any_id'
    await sut.getById(id)
    expect(sutSpy).toHaveBeenCalledWith(id)
  })
  test('Should throw when getVaultRepository throws', async () => {
    const { sut, getVaultRepository } = makeSut()
    const id = 'any_id'
    jest.spyOn(getVaultRepository, 'get').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error()
      })
    })
    await expect(sut.getById(id)).rejects.toThrow()
  })
  test('Should throw NotFoundError when vault are not found', async () => {
    const { sut, getVaultRepository } = makeSut()
    const id = 'invalid_id'
    jest.spyOn(getVaultRepository, 'get').mockImplementationOnce(async () => {
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
  test('ensure getGetById return a vault when find by id', async () => {
    const { sut } = makeSut()
    const id = 'valid_id'
    const getVault = await sut.getById(id)
    expect(getVault).toEqual(vault)
  })
})
