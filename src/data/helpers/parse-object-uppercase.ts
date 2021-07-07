import { ParseObjectUpperCase } from "../interfaces/helpers/parse-object-uppercase";

export class ParseParamsUpper implements ParseObjectUpperCase{
    parse(params: any) {
        for(const key in params){
            params[key].toUpperCase()
        }
        return params
    }
}