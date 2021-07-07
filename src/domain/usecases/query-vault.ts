import { Vault } from '../models/vault'

export interface QueryVault {
  query: (vaultParams: any) => Promise<Vault[]>
}
