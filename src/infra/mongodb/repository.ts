import mongoose, { Mongoose } from 'mongoose'
import { AddVaultRepository } from '../../data/interfaces/vault/add-vault-repository'
import { GetVaultByIdRepository } from '../../data/interfaces/vault/get-vault-by-id'
import { QueryVaultRepository } from '../../data/interfaces/vault/query-vault-repository'
import { VaultParams, Vault } from '../../domain/models/vault'
import VaultRepository from './models/vault'

export class MongoDBRepository implements AddVaultRepository, GetVaultByIdRepository, QueryVaultRepository {
  private mongooseConnection: Mongoose | any
  
  async get (id: string): Promise<Vault | null> {
    const vault = await VaultRepository.findById(id)
    return this.mapObject(vault)
  }

  async query(params: any):Promise<Vault[]> {
    const vaultQueryResult = await VaultRepository.find(params)
    const mapVaults = vaultQueryResult.map(vault => this.mapObject(vault))
    return mapVaults
  }
  
  async add (vault: VaultParams): Promise<Vault> {
    const addedVault = await VaultRepository.create(vault)
    return this.mapObject(addedVault)
  }

  async connect (): Promise<Mongoose> {
    this.mongooseConnection = await mongoose.connect('mongodb://0.0.0.0:27017/teste',{
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    return this.mongooseConnection
  }

  async getAll (): Promise<Vault[]> {
    const getAll = await VaultRepository.find()
    return this.mapObject(getAll)
  }

  mapObject (object: any): any {
    const _doc = object._doc
    const { _id, __v,...rest } = _doc
    return { ...rest, id: _id }
  }
}
