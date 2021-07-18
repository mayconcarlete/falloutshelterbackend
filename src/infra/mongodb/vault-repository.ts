import { AddDwellerRepository } from '../../data/interfaces/dweller/add-dweller'
import { GetVaultByIdRepository } from '../../data/interfaces/dweller/get-vault-by-id'
import { QueryVaultRepository } from '../../data/interfaces/dweller/query-vault'
import { DwellerParams, Dweller } from '../../domain/models/dweller'
import VaultRepositoryModel from './models/vault'
import { MongoDB } from './helper'

export class VaultRepository implements AddDwellerRepository, GetVaultByIdRepository, QueryVaultRepository {
  async get (id: string): Promise<Dweller | null> {
    try {
      const vault = await VaultRepositoryModel.findById(id)
      return MongoDB.mapObject(vault)
    } catch (error) {
      return null
    }
  }

  async query (params: any): Promise<Dweller[]> {
    const vaultQueryResult = await VaultRepositoryModel.find(params)
    const mapVaults = vaultQueryResult.map(vault => MongoDB.mapObject(vault))
    return mapVaults
  }

  async add (vault: DwellerParams): Promise<Dweller> {
    const addedVault = await VaultRepositoryModel.create(vault)
    return MongoDB.mapObject(addedVault)
  }
}
