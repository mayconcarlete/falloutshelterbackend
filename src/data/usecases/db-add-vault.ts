import { VaultParams, Vault } from "../../domain/models/vault";
import { AddVault } from "../../domain/usecases/add-vault";
import { AddVaultRepository } from "../interfaces/vault/add-vault-repository";

export class DbAddVault implements AddVault{
    constructor(
        private readonly addVaultRepository: AddVaultRepository
    ){}

    async create(vault: VaultParams): Promise<Vault> {
        const vaultUpperCase = this.passFieldsToUpperCase(vault)
        const addedVault = await this.addVaultRepository.add(vaultUpperCase)
        return addedVault
    }
    
    passFieldsToUpperCase(vault: VaultParams):VaultParams {
        return {
            age: vault.age,
            eyeColor: vault.eyeColor.toUpperCase(),
            hairColor: vault.hairColor.toUpperCase(),
            name: vault.name.toUpperCase()
        }
    }
}