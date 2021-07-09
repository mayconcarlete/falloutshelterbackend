import { AddVaultRepository } from '../../../../src/data/interfaces/vault/add-vault-repository'
import { DbAddVault } from '../../../../src/data/usecases/db-add-vault'
import { MockAddVaultRepository } from './mocks/add-vault-repository'
import { expectedResponse, vault } from './mocks/constants'

type SutTypes = {
  sut: DbAddVault
  addVaultRepository: AddVaultRepository
}

const makeSut = (): SutTypes => {
  const addVaultRepository = new MockAddVaultRepository()
  const sut = new DbAddVault(addVaultRepository)
  return { sut, addVaultRepository }
}

describe('Db Add Vault', () => {
  test('Should pass fields to uppercase', () => {
    const { sut } = makeSut()
    const vaultUpperCase = sut.passFieldsToUpperCase(vault)
    expect(vaultUpperCase).toEqual(expectedResponse)
  })
  
  test('Should call addVaultRepository with correct params', async() => {
    const {sut, addVaultRepository} = makeSut()
    const addVaultSpy = jest.spyOn(addVaultRepository, 'add')
    await sut.create(vault)
    expect(addVaultSpy).toHaveBeenCalledWith(expectedResponse)
  })

  test('Should throw if addVaultRepository throws', async () => {
    const { sut, addVaultRepository } = makeSut()
    jest.spyOn(addVaultRepository, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw Error('Repository error')
      })
    })
    await expect(sut.create(vault)).rejects.toThrow()
  })

  test('Should return a new Vault when addVaultRepository is successful', async() => {
    const {sut} = makeSut()
    const newVault = await sut.create(vault)
    expect(newVault).toEqual({...expectedResponse, id:'valid_id'})
  })
})
