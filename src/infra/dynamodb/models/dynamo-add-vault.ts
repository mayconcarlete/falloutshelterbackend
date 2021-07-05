import { Item } from './dynamo-vault-obj'

export type AddVaultDynamoMap = {
  TableName: string
  ConditionExpression: string
  Item: Item
}
