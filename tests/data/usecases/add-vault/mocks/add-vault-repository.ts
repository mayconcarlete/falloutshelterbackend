import { AddDwellerRepository } from '../../../../../src/data/interfaces/dweller/add-dweller'
import { Dweller, DwellerParams } from '../../../../../src/domain/models/dweller'

export class MockAddVaultRepository implements AddDwellerRepository {
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
