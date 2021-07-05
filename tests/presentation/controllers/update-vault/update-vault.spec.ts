import { UpdateVaultController } from "../../../../src/presentation/controllers/update-vault"
import { IValidate } from "../../../../src/presentation/interfaces/validate"
import { THttpRequest } from "../../../../src/presentation/types/http"
import { MockedValidator } from "./mocks/validator"



type SutTypes = {
    sut: UpdateVaultController
    validators: IValidate
}

const makeSut = (): SutTypes => {
    const validators = new MockedValidator()
    const sut = new UpdateVaultController(validators)
    return { sut, validators }
}

describe('Update Vault Controller', () => {
    // test('Should return a updated vault when update is success', async () => {
    //     const { sut } = makeSut()
    //     const request: THttpRequest = {
    //         body: {
    //             validField: 'update'
    //         }
    //     }
    //     const response = await sut.handle(request)
    //     expect(response.statusCode).toBe(200)
    //     expect(response.body).toEqual({})
    // })
    test('Should return a BadRequest if validation fails', async () => {
        const { sut, validators } = makeSut()
        const key = 'invalidKey'
        const request: THttpRequest = {
            params: 'valid_id',
            body: {
                [key]: 'valid_value'
            }
        }
        jest.spyOn(validators, 'validate').mockImplementationOnce(() => {
            throw new Error('Validation Fails')
        })
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new Error('Validation Fails'))
    })
})