import { Vault, VaultParams } from "../../../../../src/domain/models/vault"
import { AddVault } from "../../../../../src/domain/usecases/add-vault"

export const expected_response = {
    id: 'valid_id',
    name: 'MAYCON',
    age: 1,
    eyeColor: 'BROWN',
    hairColor: 'BROWN',
}

export class MockAddVault implements AddVault{
    create(vault: VaultParams): Promise<Vault> {
        return new Promise((resolve, reject) => {
            resolve(expected_response)
        })
    }
}
