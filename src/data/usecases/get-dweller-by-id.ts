import { Dweller } from '../../domain/models/dweller'
import { GetDwellerById } from '../../domain/usecases/get-dweller-by-id'
import { NotFoundError } from '../../presentation/errors/not-found'
import { GetDwellerByIdRepository } from '../interfaces/dweller/get-dweller-by-id'

export class GetDwellerByIdUseCase implements GetDwellerById {
  constructor (
    private readonly getDwellerRepository: GetDwellerByIdRepository
  ) {}

  async getById (id: string): Promise<Dweller | null> {
    const dweller = await this.getDwellerRepository.get(id)
    if (!dweller) {
      throw new NotFoundError('cant found a dweller')
    }
    return dweller
  }
}
