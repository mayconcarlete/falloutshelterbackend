import { RequiredFieldError } from '../errors/required-field'
import { IValidate } from '../interfaces/validate'

export class RequiredField implements IValidate {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | undefined {
    if (!input[this.fieldName]) {
      throw new RequiredFieldError(this.fieldName)
    }
    return undefined
  }
}
