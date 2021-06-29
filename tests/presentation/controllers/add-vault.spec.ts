import { AddVaultController } from "../../../src/presentation/controllers/add-vault"
import { IValidate } from "../../../src/presentation/interfaces/validate"
import { THttpRequest } from "../../../src/presentation/types/http"

class MockValidator implements IValidate{
    validate(input: any): Error | undefined {
        return
    }
}

type SutTypes = {
    sut: AddVaultController
    validator: IValidate
}

const makeSut = ():SutTypes => {
    const validator = new MockValidator()
    const sut  = new AddVaultController(validator)
    return {sut, validator}
}
describe('Add Vault Controller', () => {
    test('Should return bad request when validation fails', async () => {
        const {sut} = makeSut()
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
        const response = await sut.handle({})
        expect(response.statusCode).toBe(200)
    })
})