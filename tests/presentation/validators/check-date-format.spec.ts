import { CheckDateFormatError } from "../../../src/presentation/errors/check-date-format"
import { CheckDateFormat } from "../../../src/presentation/validators/check-date-format"

describe('Check Date Format', () => {
    test('Should return error if Date is in wrong format', () => {
        const fieldName = 'date'
        const sut = new CheckDateFormat(fieldName)
        const body = {
            [fieldName]: 'invalid_date_format'
        } 
        const validateDate = sut.validate(body)
        expect(validateDate).toEqual(new CheckDateFormatError())
    })
})