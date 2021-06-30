import { AddVaultRepository } from "../../data/interfaces/vault/add-vault-repository";
import { VaultParams, Vault } from "../../domain/models/vault";

export class DynamoDbRepository implements AddVaultRepository{
    async add(vault: VaultParams): Promise<Vault> {
        const addedVault = {
            id: 'valid_id',
            age:1,
            eyeColor: 'BROWN',
            name: 'MAYCON',
            hairColor: 'BROWN'
        } 
        return new Promise((resolve, reject) => {
            resolve(addedVault)
        })
    }
}