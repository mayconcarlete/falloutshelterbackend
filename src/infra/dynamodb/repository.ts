import { AddVaultRepository } from '../../data/interfaces/vault/add-vault-repository'
import { VaultParams, Vault } from '../../domain/models/vault'
import { vaultTable } from './models/vault'
import AWS from 'aws-sdk'
import { v4 } from 'uuid'
import { DynamoDbConfig } from './config'
import { GetVaultById } from '../../domain/usecases/get-vault-by-id'
import { AddVaultDynamoMap } from './models/dynamo-add-vault'
import { GetItemOutput } from 'aws-sdk/clients/dynamodb'

export class DynamoDbRepository implements AddVaultRepository, GetVaultById {
  private readonly aws
  constructor (config: DynamoDbConfig) {
    this.aws = new AWS.DynamoDB(config)
  }

  async getById (id: string, tableName: string = 'Vault'): Promise<Vault | null> {
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

  async add (vault: VaultParams, table: string = 'Vault'): Promise<Vault> {
    const id = this.get_id()
    const params = this.mapToDynamoObject({ ...vault, id }, table)
    return new Promise((resolve, reject) => {
      this.aws.putItem(params, (err, data) => {
        if (err) reject(err)
        resolve({ ...vault, id })
      })
    })
  }

  mapToJsonObject (dynamoObj: GetItemOutput): Vault {
    return {
      id: dynamoObj.Item?.id.S!,
      name: dynamoObj.Item?.name.S!,
      eyeColor: dynamoObj.Item?.eyeColor.S!,
      hairColor: dynamoObj.Item?.hairColor.S!,
      age: dynamoObj.Item?.age.S!
    }
  }

  mapToDynamoObject (vault: Vault, table: string): AddVaultDynamoMap {
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
}
