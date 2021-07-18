import { RemoveParams } from '../interfaces/helpers/remove-undefined-params'

export class RemoveUndefinedParams implements RemoveParams {
  constructor (
    private readonly fields: string[]
  ) {}

  remove (dwellerParams: any): any {
    let validParams = {}
    for (const field of this.fields) {
      if (dwellerParams[field]) {
        validParams = { ...validParams, [field]: dwellerParams[field] }
      }
    }
    return validParams
  }
}
