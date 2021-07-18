import { CheckDateFormat } from '../../../../presentation/validators/check-date-format'
import { RequiredField } from '../../../../presentation/validators/required-field'
import { TypeOfField } from '../../../../presentation/validators/type-of-field'
import { ValidatorComposite } from '../../../../presentation/validators/validator-composite'

export const makeAddDwellerValidators = (): ValidatorComposite => {
  const arrayOfValidations = []

  const name = new RequiredField('name')
  const age = new RequiredField('age')
  const hairColor = new RequiredField('hairColor')
  const eyeColor = new RequiredField('eyeColor')

  arrayOfValidations.push(name)
  arrayOfValidations.push(age)
  arrayOfValidations.push(hairColor)
  arrayOfValidations.push(eyeColor)

  const typeName = new TypeOfField('string', 'name')
  const typeAge = new TypeOfField('string', 'age')
  const typeHair = new TypeOfField('string', 'hairColor')
  const typeEyeColor = new TypeOfField('string', 'eyeColor')

  arrayOfValidations.push(typeName)
  arrayOfValidations.push(typeAge)
  arrayOfValidations.push(typeHair)
  arrayOfValidations.push(typeEyeColor)

  const checkDateFormat = new CheckDateFormat('age')

  arrayOfValidations.push(checkDateFormat)

  const validatorComposite = new ValidatorComposite(arrayOfValidations)

  return validatorComposite
}
