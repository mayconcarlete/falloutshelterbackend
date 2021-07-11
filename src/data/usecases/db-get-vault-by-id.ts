import { Vault } from '../../domain/models/vault'
import { GetVaultById } from '../../domain/usecases/get-vault-by-id'
import { NotFoundError } from '../../presentation/errors/not-found'
import { GetVaultByIdRepository } from '../interfaces/vault/get-vault-by-id'

export class DbGetVaultById implements GetVaultById {
  constructor (
    private readonly getVaultRepository: GetVaultByIdRepository
  ) {}

  async getById (id: string): Promise<Vault | null> {
    const vault = await this.getVaultRepository.get(id)
    if (!vault) {
      throw new NotFoundError('cant found a vault')
    }
    return vault
  }
}
