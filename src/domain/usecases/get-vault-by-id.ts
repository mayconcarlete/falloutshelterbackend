import { Dweller } from '../models/dweller'

export interface GetVaultById {
  getById: (id: string) => Promise<Dweller | null>
}
