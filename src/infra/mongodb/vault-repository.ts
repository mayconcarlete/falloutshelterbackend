import { AddVaultRepository } from '../../data/interfaces/vault/add-vault'
import { GetVaultByIdRepository } from '../../data/interfaces/vault/get-vault-by-id'
import { QueryVaultRepository } from '../../data/interfaces/vault/query-vault'
import { VaultParams, Vault } from '../../domain/models/vault'
import VaultRepositoryModel from './models/vault'
import {MongoDB} from './helper'

export class VaultRepository implements AddVaultRepository, GetVaultByIdRepository, QueryVaultRepository {

  async get (id: string): Promise<Vault | null> {
    try{
      const vault = await VaultRepositoryModel.findById(id)
      return MongoDB.mapObject(vault)
    }catch(error){
      return null
    }
  }

  async query(params: any):Promise<Vault[]> {
    const vaultQueryResult = await VaultRepositoryModel.find(params)
    const mapVaults = vaultQueryResult.map(vault => MongoDB.mapObject(vault))
    return mapVaults
  }
  
  async add (vault: VaultParams): Promise<Vault> {
    const addedVault = await VaultRepositoryModel.create(vault)
    return MongoDB.mapObject(addedVault)
  }
}
