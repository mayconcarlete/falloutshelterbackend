import { AddVaultRepository } from "../../data/interfaces/vault/add-vault-repository";
import { VaultParams, Vault } from "../../domain/models/vault";
import AWS from 'aws-sdk'

export class DynamoDbRepository implements AddVaultRepository{
    constructor(){

    }
    async createTable(): Promise<void>{
        try{
            const config = {
                'endpoint': 'http://localhost:8000',
                'region': 'us-east-1',
                'accessKeyId': 'DUMMY_ID',
                'secretAccessKey': 'DUMMY_KEY',
                'AWS_SDK_LOAD_CONFIG': 1
            }
            const vaultTable = {
                TableName: 'Vault',
                KeySchema:[
                    {AttributeName: 'id', KeyType: 'HASH'},
                    {AttributeName: 'name', KeyType: 'RANGE'}
                ],
                AttributeDefinitions:[
                    {AttributeName: 'id', AttributeType: 'S'},
                    {AttributeName: 'name', AttributeType: 'S'},
                    {AttributeName: 'hairColor', AttributeType: 'S'},
                    {AttributeName: 'eyeColor', AttributeType: 'S'},
                    {AttributeName: 'age', AttributeType: 'S'}
                ]
            }
            const dynamoDb = new AWS.DynamoDB(config)
            const creatingTable = await dynamoDb.createTable(vaultTable).promise()
            console.log('promise criada' + creatingTable)
        }catch(e){
            console.log('Error')
            console.log(e)
        }
    }

    async add(vault: VaultParams): Promise<Vault> {
        const addedVault = {
            id: 'valid_id',
            age:1,
            eyeColor: 'BROWN',
            name: 'MAYCON',
            hairColor: 'BROWN'
        } 
        const config = {

        }
        return new Promise((resolve, reject) => {
            resolve(addedVault)
        })
    }
}