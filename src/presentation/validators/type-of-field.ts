import { IValidate } from '../interfaces/validate'

export class TypeOfField implements IValidate {
  constructor (
    private readonly typeOfField: string,
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | undefined {
    if (typeof input[this.fieldName] !== this.typeOfField) {
      throw TypeError(`Type of field: ${this.fieldName}, is wrong of: ${this.typeOfField}`)
    }
    return undefined
  }
}
