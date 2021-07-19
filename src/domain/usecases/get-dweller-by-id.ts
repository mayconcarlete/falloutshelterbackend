import { Dweller } from '../models/dweller'

export interface GetDwellerById {
  getById: (id: string) => Promise<Dweller | null>
}
