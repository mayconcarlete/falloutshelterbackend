import { Vault } from "../../domain/models/vault";
import { QueryVault } from "../../domain/usecases/query-vault";
import { ParseParamsUpper } from "../helpers/parse-object-uppercase";
import { RemoveParams } from "../interfaces/helpers/remove-undefined-params";
import { QueryVaultRepository } from "../interfaces/vault/query-vault-repository";

export class DbQueryVault implements QueryVault{
    constructor(
        private readonly removeUndefinedParams: RemoveParams,
        private readonly parseParamsUpperCase: ParseParamsUpper,
        private readonly queryVaultRepository: QueryVaultRepository
    ){}
    async query(vaultParams: Vault):Promise<Vault[]>{
        const paramsToQuery = this.removeUndefinedParams.remove(vaultParams)
        const paramsToUpperCase = this.parseParamsUpperCase.parse(paramsToQuery)
        return new Promise((resolve, reject) => {
            resolve([paramsToUpperCase])
        })
    }
}