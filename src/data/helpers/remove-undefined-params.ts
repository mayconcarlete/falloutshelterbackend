import { RemoveParams } from "../interfaces/helpers/remove-undefined-params";

export class RemoveUndefinedParams implements RemoveParams {
    remove(vaultParams: any) {
        for (const key in vaultParams) {
            if(!vaultParams[key]){
                delete vaultParams[key]
            }
        }
        return vaultParams
    }
}