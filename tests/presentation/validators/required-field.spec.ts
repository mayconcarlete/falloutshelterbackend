import { RequiredFieldError } from "../../../src/presentation/errors/required-field"
import { RequiredField } from "../../../src/presentation/validators/required-field"


describe('Required Field Validator', () => {
    test('Should throw when required field is not provided', () => {
        const fieldName = 'missed_field'
        const body = {}
        const sut = new RequiredField(fieldName)
        expect(()=>sut.validate(body)).toThrow(RequiredFieldError)
    })
})