import { Vault} from "../../../domain/models/vault";

export interface AddVaultRepository {
    add(vault: Vault):Promise<Vault>
}