import { Item } from './dynamo-dweller-obj'

export type AddDwellerDynamoMap = {
  TableName: string
  ConditionExpression: string
  Item: Item
}
