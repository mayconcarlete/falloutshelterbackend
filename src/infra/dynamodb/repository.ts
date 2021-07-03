import { AddVaultRepository } from "../../data/interfaces/vault/add-vault-repository";
import { VaultParams, Vault } from "../../domain/models/vault";
import {vaultTable} from './models/vault'
import AWS from 'aws-sdk'
import {v4} from 'uuid'
import { DynamoDbConfig } from "./config";

export class DynamoDbRepository implements AddVaultRepository{
    private aws
    constructor(config: DynamoDbConfig){
        this.aws = new AWS.DynamoDB(config)
    }     
    
    async add(vault: VaultParams, table:string = 'Vault'):Promise<Vault> {
        const id = this.get_id() 
        const params = this.mapObject({...vault, id}, table)
        return new Promise((resolve, reject) => {
            this.aws.putItem(params, (err, data) => {
                if(err) reject(err)
                resolve({...vault, id})
            })
        })
    }

    mapObject(vault:Vault, table:string){
        return {
            "TableName": table,
            "ConditionExpression": "attribute_not_exists(id)",
            "Item":{
                "id": {"S": vault.id},
                "age":{"S": vault.age},
                "eyeColor": {"S": vault.eyeColor},
                "name": {"S": vault.name},
                "hairColor": {"S": vault.hairColor}
            } 
        }
    }
    get_id():string{
        return v4()
    }
    async remove(id:string): Promise<any>{
        const params = {
            TableName: 'Vault',
            Key:{
                "id":{
                    S:id
                },
                
            }
        }
        return new Promise((resolve, reject) => {
            this.aws.deleteItem(params, function(err, data){
                if(err){reject(err)}
                resolve(data)
            })
        })
    }
    async createTable(): Promise<void>{
            return new Promise((resolve, reject) => {
                this.aws.createTable(vaultTable, function(err, data){
                    if(err) reject(err)
                    resolve()
                })
            })
    }
}