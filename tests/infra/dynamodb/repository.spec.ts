import { DynamoDbRepository } from "../../../src/infra/dynamodb/repository"

type SutTypes = {
    sut: DynamoDbRepository
}

const config = {
    'endpoint': 'http://localhost:8000',
    'region': 'us-east-1',
    'accessKeyId': 'DUMMY_ID',
    'secretAccessKey': 'DUMMY_KEY'
}

const dummyVault = {
    "name": "Maycon",
    "age": new Date().toISOString(),
    "eyeColor": "green",
    "hairColor": "red"
} 

const makeSut = ():SutTypes => {
    const sut = new DynamoDbRepository(config) 
    return {sut}
}

describe('DynamoDb Repository', () => {
    test('Should add a Vault with correct params', async () => {
        const { sut } = makeSut() 
        const response = await sut.add(dummyVault)
        await sut.remove(response.id)
        expect(response.id).toBeTruthy()
        expect(response.name).toBe(dummyVault.name)
        expect(response.age).toBe(dummyVault.age)
        expect(response.eyeColor).toBe(dummyVault.eyeColor)
        expect(response.hairColor).toBe(dummyVault.hairColor)
    })
    test('Should remove vault by id', async () => {
        const { sut } = makeSut()
        const addVault = await sut.add(dummyVault)
        const removedVault = await sut.remove(addVault.id)
        expect(removedVault).toEqual({})
    })
    test('Should get a Vault by given an id', async() => {
        const {sut} = makeSut()
        const addedVault = await sut.add(dummyVault)
        const getVault = await sut.getById(addedVault.id)
        expect(getVault).toEqual(addedVault)
    })
})