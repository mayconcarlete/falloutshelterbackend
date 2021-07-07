import { ParseObjectUpperCase } from "../interfaces/helpers/parse-object-uppercase";


export class ParseParamsUpper implements ParseObjectUpperCase{
    params: any
    parse(params: any) {
        this.params = params
        let paramsUpperCase = {...params}
        for(const key in params){
            paramsUpperCase[key] = params[key].toUpperCase()
        }
        return paramsUpperCase
    }
}