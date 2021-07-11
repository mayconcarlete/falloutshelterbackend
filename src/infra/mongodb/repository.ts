import mongoose from 'mongoose'
import {Mongoose} from 'mongoose'
import { AddVaultRepository } from '../../data/interfaces/vault/add-vault-repository'
import { GetVaultByIdRepository } from '../../data/interfaces/vault/get-vault-by-id'
import { VaultParams, Vault } from '../../domain/models/vault'
import VaultRepository from './models/vault'

export class MongoDBRepository implements AddVaultRepository, GetVaultByIdRepository {
    private mongooseConnection: Mongoose | any
    constructor(){
    }
    async get(id: string): Promise<Vault | null> {
        const vault = await VaultRepository.findById(id)
        return this.mapObject(vault)
    }
    async add(vault: VaultParams):Promise<Vault>{
        const addedVault =  await VaultRepository.create(vault) 
        return this.mapObject(addedVault)
    }
    async connect(){
        this.mongooseConnection = await mongoose.connect('mongodb://0.0.0.0:27017/teste',{
            useCreateIndex:true,    
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    async getAll(){
        return await VaultRepository.find()
    }
    mapObject(object:any):any{
        const _doc = object._doc
        const {_id, __v,...rest} = _doc
        return {...rest, id:_id}
    }
}
