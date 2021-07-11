import { RemoveParams } from '../interfaces/helpers/remove-undefined-params'

export class RemoveUndefinedParams implements RemoveParams {
  constructor(
    private readonly fields: string[]
  ){}
  remove (vaultParams: any): any {
    let validParams = {}
    for (const field of this.fields) {
      if(vaultParams[field]){
        validParams = {...validParams, [field]: vaultParams[field]}
      }
    }
    return validParams
  }
}
