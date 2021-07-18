import { Dweller } from '../models/dweller'

export interface QueryVault {
  query: (vaultParams: any) => Promise<Dweller[]>
}
