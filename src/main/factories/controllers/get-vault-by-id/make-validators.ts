import { RequiredField } from '../../../../presentation/validators/required-field'
import { TypeOfField } from '../../../../presentation/validators/type-of-field'
import { ValidatorComposite } from '../../../../presentation/validators/validator-composite'

export const makeGetVaultByIdValitors = (): ValidatorComposite => {
  const requiredField = new RequiredField('id')
  const typeOfField = new TypeOfField('string', 'id')
  const arrayOfValidations = [requiredField, typeOfField]
  const validators = new ValidatorComposite(arrayOfValidations)

  return validators
}
