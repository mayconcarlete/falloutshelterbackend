import { CheckDateFormatError } from '../../../src/presentation/errors/check-date-format'
import { IValidate } from '../../../src/presentation/interfaces/validate'
import { CheckDateFormat } from '../../../src/presentation/validators/check-date-format'

type SutTypes = {
  sut: IValidate
}

const fieldName = 'date'

const makeSut = (): SutTypes => {
  const sut = new CheckDateFormat(fieldName)
  return { sut }
}

describe('Check Date Format', () => {
  test('Should throws an error if Date is in wrong format', () => {
    const { sut } = makeSut()
    const body = {
      [fieldName]: 'invalid_date_format'
    }
    try {
      sut.validate(body)
    } catch (error) {
      expect(error).toEqual(new CheckDateFormatError())
    }
  })
  test('Should be falsy when validation succeeds', () => {
    const { sut } = makeSut()
    const body = {
      [fieldName]: '2020-06-06'
    }
    const validateDate = sut.validate(body)
    expect(validateDate).toBeFalsy()
  })
})
