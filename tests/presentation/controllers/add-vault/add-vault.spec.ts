import { VaultParams, Vault, EyeColor } from "../../../../src/domain/models/vault"
import { AddVault } from "../../../../src/domain/usecases/add-vault"
import { AddVaultController } from "../../../../src/presentation/controllers/add-vault"
import { IValidate } from "../../../../src/presentation/interfaces/validate"
import { THttpRequest } from "../../../../src/presentation/types/http"
import { MockAddVault } from "./mocks/add-vault"
import { MockValidator } from "./mocks/validator"


type SutTypes = {
    sut: AddVaultController
    validator: IValidate
    addVaultUseCase: AddVault
}

const makeSut = ():SutTypes => {
    const validator = new MockValidator()
    const addVaultUseCase = new MockAddVault()
    const sut  = new AddVaultController(validator, addVaultUseCase)
    return {sut, validator, addVaultUseCase}
}

describe('Add Vault Controller', () => {
    test('Should return bad request when validation fails', async () => {
        const {sut, validator} = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => {
            throw Error('Test Error')
        })
        const request:THttpRequest = {
            body:{
                'any_field': 'invalid_value'
            }
        }
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(400)
    })
    test('Should return 200 when add vault with success', async () => {
        const {sut} = makeSut()
        const expected_response = {
            id: 'valid_id',
            name: 'Maycon',
            age: 1,
            eyeColor: EyeColor.GREEN,
            hairColor: 'brown',
        }
        const request:THttpRequest = {
            body:{
                name: 'valid_name', 
                age: 1, 
                hairColor: 'valid_hair_color', 
                eyeColor: 'valid_eye_color'
            }
        }
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(expected_response)
    })
})