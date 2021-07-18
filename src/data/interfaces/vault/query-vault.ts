import { Dweller } from '../../../domain/models/dweller'

export interface QueryVaultRepository{
  query: (params: any) => Promise<Dweller[]>
}
