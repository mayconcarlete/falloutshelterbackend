import { AddVaultRepository } from '../../../../src/data/interfaces/vault/add-vault-repository'
import { DbAddVault } from '../../../../src/data/usecases/db-add-vault'
import { MockAddVaultRepository } from './mocks/add-vault-repository'
import { vault } from './mocks/constants'

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
    const expectedResponse = {
      age: '2020-06-02',
      eyeColor: 'BROWN',
      name: 'MAYCON',
      hairColor: 'BROWN'
    }
    expect(vaultUpperCase).toEqual(expectedResponse)
  })

  test('Should throw if repository throws', async () => {
    const { sut, addVaultRepository } = makeSut()
    jest.spyOn(addVaultRepository, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw Error('Repository error')
      })
    })
    await expect(sut.create(vault)).rejects.toThrow()
  })
})
