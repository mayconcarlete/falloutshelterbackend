import { GetVaultByIdController } from "../../../../src/presentation/controllers/get-vault-by-id"
import { IValidate } from "../../../../src/presentation/interfaces/validate"
import { RequiredField } from "../../../../src/presentation/validators/required-field"
import { MockValidator } from "./mocks/validator"

type SutTypes = {
    sut: GetVaultByIdController
    validators: IValidate
}

const makeSut = ():SutTypes=>{
    const validators = new MockValidator()
    const sut = new GetVaultByIdController(validators)
    return {sut, validators}
}

describe('GetVaultById Controller', () => {
    test('Should return 400 when validation fails', async () => {
        const {sut, validators} = makeSut()
        jest.spyOn(validators, 'validate').mockImplementationOnce(() => {
                throw new RequiredField('id')
        })

        const response = await sut.handle({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new RequiredField('id'))
    })
})