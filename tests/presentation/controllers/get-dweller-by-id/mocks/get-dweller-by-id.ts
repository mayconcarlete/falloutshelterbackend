import { Dweller } from '../../../../../src/domain/models/dweller'
import { GetDwellerById } from '../../../../../src/domain/usecases/get-dweller-by-id'

export class MockGetDwellerById implements GetDwellerById {
  async getById (id: string): Promise<Dweller> {
    return new Promise((resolve, reject) => {
      resolve({
        id: 'valid_id',
        name: 'MAYCON',
        age: '2020-6-02',
        eyeColor: 'BROWN',
        hairColor: 'BROWN'
      })
    })
  }
}
