import { AddVaultRepository } from "../../../../src/data/interfaces/vault/add-vault-repository"
import { DbAddVault } from "../../../../src/data/usecases/db-add-vault"
import { VaultParams } from "../../../../src/domain/models/vault"
import { MockAddVaultRepository } from "./mocks/add-vault-repository"
import { vault } from "./mocks/constants"


type SutTypes = {
    sut: DbAddVault
    addVaultRepository: AddVaultRepository
}

const makeSut = ():SutTypes => {
    const addVaultRepository = new MockAddVaultRepository()
    const sut = new DbAddVault(addVaultRepository)
    return {sut, addVaultRepository}
}

describe('Db Add Vault', () => {
    test('Should pass fields to uppercase', () => {
        const { sut } = makeSut()
        
        const expected_response:VaultParams = {
            age:1,
            eyeColor: 'BROWN',
            name: 'MAYCON',
            hairColor: 'BROWN'
        } 
        expect(sut.passFieldsToUpperCase(vault)).toEqual(expected_response)
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