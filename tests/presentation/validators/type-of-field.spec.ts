import { TypeOfField } from "../../../src/presentation/validators/type-of-field"

describe('TypeOfField Validator', () => {
    test('Should throw when type of field is wrong', () => {
        const typeOfField = 'number'
        const fieldName = 'any_field'
        const sut = new TypeOfField(typeOfField, fieldName)
        const body = {
            [fieldName]: 'invalid_type'
        }
        expect(()=>sut.validate(body)).toThrow(TypeError)
    })
})