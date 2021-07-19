import { Dweller } from '../../../domain/models/dweller'

export interface GetDwellerByIdRepository {
  get: (id: string) => Promise<Dweller | null>
}
