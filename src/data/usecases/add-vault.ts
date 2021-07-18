import { DwellerParams, Dweller } from '../../domain/models/dweller'
import { AddDweller } from '../../domain/usecases/add-dweller'
import { AddVaultRepository } from '../interfaces/vault/add-vault'

export class AddVaultUseCase implements AddDweller {
  constructor (
    private readonly addVaultRepository: AddVaultRepository
  ) {}

  async create (vault: DwellerParams): Promise<Dweller> {
    const vaultUpperCase = this.passFieldsToUpperCase(vault)
    const addedVault = await this.addVaultRepository.add(vaultUpperCase)
    return addedVault
  }

  passFieldsToUpperCase (vault: DwellerParams): DwellerParams {
    return {
      age: vault.age,
      eyeColor: vault.eyeColor.toUpperCase(),
      hairColor: vault.hairColor.toUpperCase(),
      name: vault.name.toUpperCase()
    }
  }
}
