import { VaultParams, Vault } from "../../domain/models/vault";
import { AddVault } from "../../domain/usecases/add-vault";

export class DbAddVault implements AddVault{
    create(vault: VaultParams): Promise<Vault> {
        const vaultUpperCase = this.passFieldsToUpperCase(vault)
        return new Promise((resolve, reject) => {
            resolve({
                age:1,
                eyeColor: 'brown',
                hairColor: 'BROWN',
                id: 'valid_id',
                name: 'Maycon'
            })
        })
    }
    passFieldsToUpperCase(vault: VaultParams):VaultParams {
        return {
            age: vault.age,
            eyeColor: vault.eyeColor.toUpperCase(),
            hairColor: vault.hairColor.toUpperCase(),
            name: vault.name.toUpperCase()
        }
    }
}