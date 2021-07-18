import { Dweller } from '../../domain/models/dweller'
import { GetVaultById } from '../../domain/usecases/get-vault-by-id'
import { NotFoundError } from '../../presentation/errors/not-found'
import { GetVaultByIdRepository } from '../interfaces/vault/get-vault-by-id'

export class GetVaultByIdUseCase implements GetVaultById {
  constructor (
    private readonly getVaultRepository: GetVaultByIdRepository
  ) {}

  async getById (id: string): Promise<Dweller | null> {
    const vault = await this.getVaultRepository.get(id)
    if (!vault) {
      throw new NotFoundError('cant found a vault')
    }
    return vault
  }
}
