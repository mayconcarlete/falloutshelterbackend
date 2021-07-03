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

const makeSut = ():SutTypes => {
    const sut = new DynamoDbRepository(config) 
    return {sut}
}

describe('DynamoDb Repository', () => {
    test('Should add a Vault with correct params', async () => {
        const { sut } = makeSut()
        const vault = {
            "name": "Maycon",
            "age": "1990-07-16",
            "eyeColor": "green",
            "hairColor": "red"
        }  
        const response = await sut.add(vault)
        await sut.remove(response.id)
        expect(response.id).toBeTruthy()
        expect(response.name).toBe(vault.name)
        expect(response.age).toBe(vault.age)
        expect(response.eyeColor).toBe(vault.eyeColor)
        expect(response.hairColor).toBe(vault.hairColor)
    })
    test('Should remove vault by id', async () => {
        const { sut } = makeSut()
        const vault = {
            "name": "Maycon",
            "age": "1990-07-16",
            "eyeColor": "green",
            "hairColor": "red"
        }
        const addVault = await sut.add(vault)
        const removedVault = await sut.remove(addVault.id)
        expect(removedVault).toEqual({})
    })  
})