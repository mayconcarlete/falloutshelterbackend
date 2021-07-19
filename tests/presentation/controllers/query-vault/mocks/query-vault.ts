import { Dweller } from '../../../../../src/domain/models/dweller'
import { QueryDweller } from '../../../../../src/domain/usecases/query-dweller'

export class MockQueryVault implements QueryDweller {
  async query (vaultParams: Dweller): Promise<Dweller[]> {
    return new Promise((resolve, reject) => {
      resolve([{
        id: 'valid_id',
        age: 'VALID_AGE',
        eyeColor: 'VALID_EYE_COLOR',
        hairColor: 'VALID_HAIR_COLOR',
        name: 'VALID_NAME'
      }])
    })
  }
}
