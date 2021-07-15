import { MongoDB } from "../../../../src/infra/mongodb/helper"
import VaultRepositoryModel from "../../../../src/infra/mongodb/models/vault"
import { VaultRepository } from "../../../../src/infra/mongodb/vault-repository"

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
    test('should throw when get method cant find vault by id', async() => {
        const sut = makeSut()
        const id = 'invalid_id'
        try{
            const vault = await sut.get(id)
        }catch(error){
            expect(error).toBeInstanceOf(Error)
        }
    })
})