import { IValidate } from '../interfaces/validate'

export class ValidatorComposite implements IValidate {
  constructor (
    private readonly validators: IValidate[]
  ) {}

  validate (input: any): Error | undefined {
    for (const validator of this.validators) {
      validator.validate(input)
    }
    return undefined
  }
}
