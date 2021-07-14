import { AddVaultRepository } from '../../../../../src/data/interfaces/vault/add-vault'
import { Vault, VaultParams } from '../../../../../src/domain/models/vault'

export class MockAddVaultRepository implements AddVaultRepository {
  async add (vault: VaultParams): Promise<Vault> {
    const addedVault = {
      id: 'valid_id',
      age: '2020-06-02',
      eyeColor: 'BROWN',
      name: 'MAYCON',
      hairColor: 'BROWN'
    }
    return new Promise((resolve, reject) => {
      resolve(addedVault)
    })
  }
}
