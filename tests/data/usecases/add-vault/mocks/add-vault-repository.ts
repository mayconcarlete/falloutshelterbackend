import { AddVaultRepository } from '../../../../../src/data/interfaces/vault/add-vault'
import { Dweller, DwellerParams } from '../../../../../src/domain/models/dweller'

export class MockAddVaultRepository implements AddVaultRepository {
  async add (vault: DwellerParams): Promise<Dweller> {
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
