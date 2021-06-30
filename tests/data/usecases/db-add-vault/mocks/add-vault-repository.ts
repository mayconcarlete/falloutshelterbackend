import { AddVaultRepository } from "../../../../../src/data/interfaces/vault/add-vault-repository"
import { Vault, VaultParams } from "../../../../../src/domain/models/vault"

export class MockAddVaultRepository implements AddVaultRepository {
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