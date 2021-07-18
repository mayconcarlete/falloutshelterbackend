import { Dweller } from '../../../domain/models/dweller'

export interface GetVaultByIdRepository {
  get: (id: string) => Promise<Dweller | null>
}
