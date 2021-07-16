import { IValidate } from '../../../src/presentation/interfaces/validate'
import { ValidatorComposite } from '../../../src/presentation/validators/validator-composite'

class MockValidator implements IValidate {
  validate (input: any): Error | undefined {
    return undefined
  }
}
class MockValidatorError implements IValidate {
  validate (input: any): Error | undefined {
    throw new Error('Error test')
  }
}

describe('Validator Composite', () => {
  test('Should return first error when some validation fails', () => {
    const validators = [new MockValidator(), new MockValidator(), new MockValidatorError()]
    const sut = new ValidatorComposite(validators)
    expect(() => sut.validate({})).toThrow(Error)
  })
  test('Should return falsy when validation succeeds', () => {
    const validators = [new MockValidator(), new MockValidator()]
    const sut = new ValidatorComposite(validators)
    const input = { dummy_key: 'dummy_value' }
    const validationResult = sut.validate(input)
    expect(validationResult).toBeFalsy()
  })
})
