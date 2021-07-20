import { AddDwellerRepository } from '../../data/interfaces/dweller/add-dweller'
import { DwellerParams, Dweller } from '../../domain/models/dweller'
import { dwellerTable } from './models/dweller'
import AWS from 'aws-sdk'
import { v4 } from 'uuid'
import { DynamoDbConfig } from './config'
import { GetDwellerById } from '../../domain/usecases/get-dweller-by-id'
import { AddDwellerDynamoMap } from './models/dynamo-add-dweller'
import { GetItemOutput } from 'aws-sdk/clients/dynamodb'
import { QueryDweller } from '../../domain/usecases/query-dweller'

export class DynamoDbRepository implements AddDwellerRepository, GetDwellerById, QueryDweller {
  private readonly aws
  constructor (config: DynamoDbConfig) {
    this.aws = new AWS.DynamoDB(config)
  }

  async getById (id: string, tableName: string = 'dweller'): Promise<Dweller | null> {
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
          const dweller = this.mapToJsonObject(data)
          resolve(dweller)
        }
      })
    })
  }

  async add (dweller: DwellerParams, table: string = 'Dweller'): Promise<Dweller> {
    const id = this.get_id()
    const params = this.mapToDynamoObject({ ...dweller, id }, table)
    return new Promise((resolve, reject) => {
      this.aws.putItem(params, (err, data) => {
        if (err) reject(err)
        resolve({ ...dweller, id })
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

  mapToDynamoObject (dweller: Dweller, table: string): AddDwellerDynamoMap {
    return {
      TableName: table,
      ConditionExpression: 'attribute_not_exists(id)',
      Item: {
        id: { S: dweller.id },
        age: { S: dweller.age },
        eyeColor: { S: dweller.eyeColor },
        name: { S: dweller.name },
        hairColor: { S: dweller.hairColor }
      }
    }
  }

  get_id (): string {
    return v4()
  }

  async remove (id: string): Promise<any> {
    const params = {
      TableName: 'Dweller',
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
      this.aws.createTable(dwellerTable, function (err, data) {
        if (err) reject(err)
        resolve()
      })
    })
  }

  async query (dwellerParams: any): Promise<Dweller[]> {
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
