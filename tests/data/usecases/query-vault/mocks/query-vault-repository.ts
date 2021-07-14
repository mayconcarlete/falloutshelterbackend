import { QueryVaultRepository } from '../../../../../src/data/interfaces/vault/query-vault'
import { Vault } from '../../../../../src/domain/models/vault'

export class MockQueryVaultRepository implements QueryVaultRepository {
  async query (params: any): Promise<Vault[]> {
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
