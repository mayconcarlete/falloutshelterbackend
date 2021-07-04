import { Vault } from "../models/vault";

export interface GetVaultById {
    getById(id: string):Promise<Vault | null>
}