export const vaultTable = {
    TableName: 'Vault',
    KeySchema:[
        {AttributeName: 'id', KeyType: 'HASH'},
        {AttributeName: 'name', KeyType: 'RANGE'},
    ],
    AttributeDefinitions:[
        {AttributeName: 'id', AttributeType: 'S'},
        {AttributeName: 'name', AttributeType: 'S'}
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    },
}