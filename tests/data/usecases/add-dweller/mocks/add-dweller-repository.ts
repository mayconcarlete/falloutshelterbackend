import { AddDwellerRepository } from '../../../../../src/data/interfaces/dweller/add-dweller'
import { Dweller, DwellerParams } from '../../../../../src/domain/models/dweller'

export class MockAddDwellerRepository implements AddDwellerRepository {
  async add (dweller: DwellerParams): Promise<Dweller> {
    const addedDweller = {
      id: 'valid_id',
      age: '2020-06-02',
      eyeColor: 'BROWN',
      name: 'MAYCON',
      hairColor: 'BROWN'
    }
    return new Promise((resolve, reject) => {
      resolve(addedDweller)
    })
  }
}
