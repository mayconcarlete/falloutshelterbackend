import { GetVaultByIdRepository } from '../../../../../src/data/interfaces/vault/get-vault-by-id'
import { Vault } from '../../../../../src/domain/models/vault'
import { vault } from './constants'

export class MockGetByIdRepository implements GetVaultByIdRepository {
  async get(id: string): Promise<Vault | null> {
    return new Promise((resolve, reject) => {
      resolve(vault)
    })
  }
}
