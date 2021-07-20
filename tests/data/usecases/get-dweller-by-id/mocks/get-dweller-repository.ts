import { GetDwellerByIdRepository } from '../../../../../src/data/interfaces/dweller/get-dweller-by-id'
import { Dweller } from '../../../../../src/domain/models/dweller'
import { dweller } from './constants'

export class MockGetByIdRepository implements GetDwellerByIdRepository {
  async get (id: string): Promise<Dweller | null> {
    return new Promise((resolve, reject) => {
      resolve(dweller)
    })
  }
}
