import { Vault } from '../models/vault'

export interface QueryVault {
  query: (vaultParams: Vault) => Promise<Vault[]>
}
