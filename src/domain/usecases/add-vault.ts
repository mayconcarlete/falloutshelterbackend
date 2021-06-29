import { Vault, VaultParams } from "../models/vault";

export interface AddVault {
    create(vault: VaultParams): Promise<Vault>
}