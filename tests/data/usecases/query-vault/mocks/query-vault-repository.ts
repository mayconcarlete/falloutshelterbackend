import { QueryVaultRepository } from '../../../../../src/data/interfaces/vault/query-vault'
import { Dweller } from '../../../../../src/domain/models/dweller'

export class MockQueryVaultRepository implements QueryVaultRepository {
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
