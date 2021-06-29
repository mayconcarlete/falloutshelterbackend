import { EyeColor, Vault, VaultParams } from "../../../../../src/domain/models/vault"
import { AddVault } from "../../../../../src/domain/usecases/add-vault"

const expected_response = {
    id: 'valid_id',
    name: 'Maycon',
    age: 1,
    eyeColor: EyeColor.GREEN,
    hairColor: 'brown',
}

export class MockAddVault implements AddVault{
    create(vault: VaultParams): Promise<Vault> {
        return new Promise((resolve, reject) => {
            resolve(expected_response)
        })
    }
}
