import { Vault } from '../../../domain/models/vault'

export interface QueryVaultRepository{
  query: (params: any) => Promise<Vault[]>
}
