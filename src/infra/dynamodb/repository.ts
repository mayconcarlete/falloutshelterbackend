import { AddDwellerRepository } from '../../data/interfaces/dweller/add-dweller'
import { DwellerParams, Dweller } from '../../domain/models/dweller'
import { vaultTable } from './models/vault'
import AWS from 'aws-sdk'
import { v4 } from 'uuid'
import { DynamoDbConfig } from './config'
import { GetVaultById } from '../../domain/usecases/get-vault-by-id'
import { AddVaultDynamoMap } from './models/dynamo-add-vault'
import { GetItemOutput } from 'aws-sdk/clients/dynamodb'
import { QueryDweller } from '../../domain/usecases/query-dweller'

export class DynamoDbRepository implements AddDwellerRepository, GetVaultById, QueryDweller {
  private readonly aws
  constructor (config: DynamoDbConfig) {
    this.aws = new AWS.DynamoDB(config)
  }

  async getById (id: string, tableName: string = 'Vault'): Promise<Dweller | null> {
    const params = {
      TableName: tableName,
      Key: { id: { S: id } }
    }
    return new Promise((resolve, reject) => {
      this.aws.getItem(params, (err, data) => {
        if (err) reject(err)
        if (!data.Item) {
          resolve(null)
        } else {
          const vault = this.mapToJsonObject(data)
          resolve(vault)
        }
      })
    })
  }

  async add (vault: DwellerParams, table: string = 'Vault'): Promise<Dweller> {
    const id = this.get_id()
    const params = this.mapToDynamoObject({ ...vault, id }, table)
    return new Promise((resolve, reject) => {
      this.aws.putItem(params, (err, data) => {
        if (err) reject(err)
        resolve({ ...vault, id })
      })
    })
  }

  mapToJsonObject (dynamoObj: GetItemOutput): Dweller {
    return {
      id: dynamoObj.Item?.id.S!,
      name: dynamoObj.Item?.name.S!,
      eyeColor: dynamoObj.Item?.eyeColor.S!,
      hairColor: dynamoObj.Item?.hairColor.S!,
      age: dynamoObj.Item?.age.S!
    }
  }

  mapToDynamoObject (vault: Dweller, table: string): AddVaultDynamoMap {
    return {
      TableName: table,
      ConditionExpression: 'attribute_not_exists(id)',
      Item: {
        id: { S: vault.id },
        age: { S: vault.age },
        eyeColor: { S: vault.eyeColor },
        name: { S: vault.name },
        hairColor: { S: vault.hairColor }
      }
    }
  }

  get_id (): string {
    return v4()
  }

  async remove (id: string): Promise<any> {
    const params = {
      TableName: 'Vault',
      Key: {
        id: {
          S: id
        }

      }
    }
    return new Promise((resolve, reject) => {
      this.aws.deleteItem(params, function (err, data) {
        if (err) { reject(err) }
        resolve(data)
      })
    })
  }

  async createTable (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.aws.createTable(vaultTable, function (err, data) {
        if (err) reject(err)
        resolve()
      })
    })
  }

  async query (vaultParams: any): Promise<Dweller[]> {
    return new Promise((resolve, reject) => {
      resolve([{
        id: 'valid_id',
        age: '2020-07-02',
        eyeColor: 'BROWN',
        name: 'MAYCON',
        hairColor: 'BROWN'
      }])
    })
  }
}
