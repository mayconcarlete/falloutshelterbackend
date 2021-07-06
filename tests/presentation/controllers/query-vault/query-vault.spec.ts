import { QueryVault } from "../../../../src/domain/usecases/query-vault"
import { QueryVaultController } from "../../../../src/presentation/controllers/query-vault"
import { THttpRequest } from "../../../../src/presentation/types/http"
import { MockQueryVault } from "./mocks/query-vault"

type SutTypes = {
    sut: QueryVaultController
    queryVaultUseCase: QueryVault
}

const makeSut = (): SutTypes => {
    const queryVaultUseCase = new MockQueryVault()
    const sut = new QueryVaultController(queryVaultUseCase)
    return { sut, queryVaultUseCase }
}

describe('Query Vault', () => {
    test('Should return ServerError if queryVaultUseCase throws', async () => {
        const { sut, queryVaultUseCase } = makeSut()
        jest.spyOn(queryVaultUseCase, 'query').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => {
                throw new Error('server throws')
            })
        })
        const request: THttpRequest = {
            params: 'valid_id',
            body: {
                name: 'valid_name',
                age: 'valid_age',
                hairColor: 'valid_hair_color',
                eyeColor: 'valid_eye_color'
            }
        }
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual(new Error('server throws'))
    })
})