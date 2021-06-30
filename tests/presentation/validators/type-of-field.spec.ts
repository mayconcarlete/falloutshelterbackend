import { TypeOfField } from "../../../src/presentation/validators/type-of-field"

describe('TypeOfField Validator', () => {
    test('Should call validate with correct params', () => {
        const typeOfField = 'string'
        const fieldName = 'any_field'
        const sut = new TypeOfField(typeOfField, fieldName)
        const body = {
            [fieldName]: 'any_value'
        }
        const validateSpy = jest.spyOn(sut, 'validate')
        sut.validate(body)
        expect(validateSpy).toHaveBeenCalledWith(body)
    })
    test('Should throw when type of field is wrong', () => {
        const typeOfField = 'number'
        const fieldName = 'any_field'
        const sut = new TypeOfField(typeOfField, fieldName)
        const body = {
            [fieldName]: 'invalid_type'
        }
        expect(()=>sut.validate(body)).toThrow(TypeError)
    })
    test('Should be falsy when type of field is right', () => {
        const typeOfField = 'string'
        const fieldName = 'any_field'
        const sut = new TypeOfField(typeOfField, fieldName)
        const body = {
            [fieldName]: 'valid_type'
        }
        const response = sut.validate(body)
        expect(response).toBeFalsy()
    })
})