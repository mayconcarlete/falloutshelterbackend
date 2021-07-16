import { CheckDateFormat } from '../../../../presentation/validators/check-date-format'
import { RequiredField } from '../../../../presentation/validators/required-field'
import { TypeOfField } from '../../../../presentation/validators/type-of-field'
import { ValidatorComposite } from '../../../../presentation/validators/validator-composite'

export const makeMoveTimeValidators = (): ValidatorComposite => {
  const arrayOfValidations = []

  const timeField = new RequiredField('time')
  const timeType = new TypeOfField('string', 'time')
  const timeCheck = new CheckDateFormat('time')

  arrayOfValidations.push(timeField, timeType, timeCheck)

  const validatorComposite = new ValidatorComposite(arrayOfValidations)
  return validatorComposite
}
