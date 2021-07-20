import { Dweller, DwellerParams } from '../../../../../src/domain/models/dweller'
import { AddDweller } from '../../../../../src/domain/usecases/add-dweller'

export const expectedResponse = {
  id: 'valid_id',
  name: 'MAYCON',
  age: '2020-6-02',
  eyeColor: 'BROWN',
  hairColor: 'BROWN'
}

export class MockAddDweller implements AddDweller {
  async create (dweller: DwellerParams): Promise<Dweller> {
    return new Promise((resolve, reject) => {
      resolve(expectedResponse)
    })
  }
}
