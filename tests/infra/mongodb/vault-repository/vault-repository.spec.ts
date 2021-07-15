import { MongoDB } from "../../../../src/infra/mongodb/helper"
import VaultRepositoryModel from "../../../../src/infra/mongodb/models/vault"
import { VaultRepository } from "../../../../src/infra/mongodb/vault-repository"
import { mockedVault } from "./mocks/vault"

const makeSut = ():VaultRepository =>{
    return new VaultRepository()
}

describe('VaultRepository class', () => {
    beforeAll(async() => {
        const mongoDB = new MongoDB()
        await mongoDB.connect()
    })
    beforeEach(async () => {
        VaultRepositoryModel.deleteMany()
    })
    test('should return null when get method cant find vault by id', async() => {
        const sut = makeSut()
        const id = 'invalid_id'
        const vault = await sut.get(id)
        expect(vault).toBe(null)
    })
    test('Should return a vault when get method find a vault by id', async() => {
        const sut = makeSut()
        const addVault = await VaultRepositoryModel.create(mockedVault) 
        const vault = await sut.get(addVault.id)
        expect(vault!.id).toBeTruthy()
        expect(vault!.name).toBe('MAYCON CARLETE')
        expect(vault!.eyeColor).toBe('BROWN')
        expect(vault!.hairColor).toBe('BROWN')
        expect(vault!.age).toBe('1990-07-16')
    })
})