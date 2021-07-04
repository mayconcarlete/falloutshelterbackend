import { DbGetVaultById } from "../../../../src/data/usecases/db-get-vault-by-id"
import { GetVaultById } from "../../../../src/domain/usecases/get-vault-by-id"
import { vault } from "./mocks/constants"
import { MockGetByIdRepository } from "./mocks/get-vault-repository"

type SutTypes = {
    sut: DbGetVaultById
    getVaultRepository: GetVaultById
}

const makeSut = ():SutTypes =>{
    const getVaultRepository = new MockGetByIdRepository()
    const sut = new DbGetVaultById(getVaultRepository)
    return {sut, getVaultRepository}        
}

describe('Db Get Vault By Id', () => {
    test('ensure getGetById return a vault when find by id', async() => {
        const {sut} = makeSut()
        const id = 'valid_id'
        const getVault = await sut.getById(id)
        expect(getVault).toEqual(vault)
    })
    test('Should throw when getVaultRepository throws', async () => {
        const {sut, getVaultRepository} = makeSut()
        const id = 'any_id'
        jest.spyOn(getVaultRepository, 'getById').mockImplementationOnce(async() => {
            return new Promise((resolve, reject) => {
                throw new Error()
            })
        })
        await expect(sut.getById(id)).rejects.toThrow()
    })
})