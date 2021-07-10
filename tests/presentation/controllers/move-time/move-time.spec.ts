import { MoveTimeController } from "../../../../src/presentation/controllers/move-time"
import { IValidate } from "../../../../src/presentation/interfaces/validate"
import { THttpRequest } from "../../../../src/presentation/types/http"
import { RequiredField } from "../../../../src/presentation/validators/required-field"
import { MockValidator } from "./mocks/validate"

type SutTypes = {
    sut: MoveTimeController
    validators: IValidate
}

const makeSut = ():SutTypes => {
    const validators = new MockValidator()
    const sut = new MoveTimeController(validators)
    return {sut, validators}
}

describe('Move Time Controllers', () => {
    test('Should throw in a bad request if validation fails', async() => {    
        const {sut, validators} = makeSut()
        jest.spyOn(validators, 'validate').mockImplementationOnce(() =>{
            throw new RequiredField('Validation Fails')
        })
        const request:THttpRequest = {
            body:{
                invalid_field:'any_value'
            }
        }
        const response = await sut.handle(request)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(new RequiredField('Validation Fails'))
    })
})