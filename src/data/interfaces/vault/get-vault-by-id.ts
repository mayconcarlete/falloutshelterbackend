import { Vault } from "../../../domain/models/vault";

export interface GetVaultByIdRepository {
    get(id:string):Promise<Vault | null>
}