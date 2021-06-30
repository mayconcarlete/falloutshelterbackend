import { RequiredFieldError } from "../../../src/presentation/errors/required-field"
import { RequiredField } from "../../../src/presentation/validators/required-field"


describe('Required Field Validator', () => {
    test('Should call validate with correct params', () => {
        const fieldName = 'any_field'
        const body = {[fieldName]:'any_value'}
        const sut = new RequiredField(fieldName)
        const validateSpy = jest.spyOn(sut, 'validate')
        sut.validate(body)
        expect(validateSpy).toHaveBeenCalledWith(body)
    })
    test('Should throw when required field is not provided', () => {
        const fieldName = 'missed_field'
        const body = {}
        const sut = new RequiredField(fieldName)
        expect(()=>sut.validate(body)).toThrow(RequiredFieldError)
    })
    test('Should be falsy when has required field', () => {
        const fieldName = 'any_field'
        const body = {[fieldName]:'any_value'}
        const sut = new RequiredField(fieldName)
        const response = sut.validate(body)
        expect(response).toBeFalsy()
    })
})