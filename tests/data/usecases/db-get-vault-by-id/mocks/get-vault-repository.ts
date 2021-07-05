import { Vault } from '../../../../../src/domain/models/vault'
import { GetVaultById } from '../../../../../src/domain/usecases/get-vault-by-id'
import { vault } from './constants'

export class MockGetByIdRepository implements GetVaultById {
  async getById (id: string): Promise<Vault | null> {
    return new Promise((resolve, reject) => {
      resolve(vault)
    })
  }
}
