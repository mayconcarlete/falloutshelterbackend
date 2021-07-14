import mongoose, { Mongoose } from 'mongoose'
import { AddVaultRepository } from '../../data/interfaces/vault/add-vault'
import { GetVaultByIdRepository } from '../../data/interfaces/vault/get-vault-by-id'
import { QueryVaultRepository } from '../../data/interfaces/vault/query-vault'
import { VaultParams, Vault } from '../../domain/models/vault'
import VaultRepository from './models/vault'
import {MongoDB} from './helper'

export class MongoDBRepository implements AddVaultRepository, GetVaultByIdRepository, QueryVaultRepository {

  async get (id: string): Promise<Vault | null> {
    const vault = await VaultRepository.findById(id)
    return MongoDB.mapObject(vault)
  }

  async query(params: any):Promise<Vault[]> {
    const vaultQueryResult = await VaultRepository.find(params)
    const mapVaults = vaultQueryResult.map(vault => MongoDB.mapObject(vault))
    return mapVaults
  }
  
  async add (vault: VaultParams): Promise<Vault> {
    const addedVault = await VaultRepository.create(vault)
    return MongoDB.mapObject(addedVault)
  }

  async getAll (): Promise<Vault[]> {
    const getAll = await VaultRepository.find()
    return MongoDB.mapObject(getAll)
  }

}
