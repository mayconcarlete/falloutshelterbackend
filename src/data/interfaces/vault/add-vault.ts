import { Vault, VaultParams } from '../../../domain/models/vault'

export interface AddVaultRepository {
  add: (vault: VaultParams) => Promise<Vault>
}
