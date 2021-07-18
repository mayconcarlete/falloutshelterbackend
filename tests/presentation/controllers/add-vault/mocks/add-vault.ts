import { Dweller, DwellerParams } from '../../../../../src/domain/models/dweller'
import { AddVault } from '../../../../../src/domain/usecases/add-vault'

export const expectedResponse = {
  id: 'valid_id',
  name: 'MAYCON',
  age: '2020-6-02',
  eyeColor: 'BROWN',
  hairColor: 'BROWN'
}

export class MockAddVault implements AddVault {
  async create (vault: DwellerParams): Promise<Dweller> {
    return new Promise((resolve, reject) => {
      resolve(expectedResponse)
    })
  }
}
