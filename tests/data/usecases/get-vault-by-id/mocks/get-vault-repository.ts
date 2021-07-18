import { GetVaultByIdRepository } from '../../../../../src/data/interfaces/vault/get-vault-by-id'
import { Dweller } from '../../../../../src/domain/models/dweller'
import { vault } from './constants'

export class MockGetByIdRepository implements GetVaultByIdRepository {
  async get (id: string): Promise<Dweller | null> {
    return new Promise((resolve, reject) => {
      resolve(vault)
    })
  }
}
