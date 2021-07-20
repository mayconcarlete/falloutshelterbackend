import { QueryDwellerRepository } from '../../../../../src/data/interfaces/dweller/query-dweller'
import { Dweller } from '../../../../../src/domain/models/dweller'

export class MockQueryDwellerRepository implements QueryDwellerRepository {
  async query (params: any): Promise<Dweller[]> {
    return new Promise((resolve, reject) => {
      resolve([{
        id: 'valid_id',
        age: '2020-07-02',
        eyeColor: 'BROWN',
        name: 'MAYCON',
        hairColor: 'BROWN'
      }])
    })
  }
}
