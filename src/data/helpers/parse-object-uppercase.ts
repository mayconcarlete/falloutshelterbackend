import { ParseObjectUpperCase } from '../interfaces/helpers/parse-object-uppercase'

export class ParseParamsUpper implements ParseObjectUpperCase {
  params: any
  paramsUpperCase: any

  parse (params: any): any {
    this.params = params
    const paramsUpperCase = { ...params }

    for (const key in params) {
      paramsUpperCase[key] = params[key].toUpperCase()
    }

    this.paramsUpperCase = paramsUpperCase
    return paramsUpperCase
  }
}
