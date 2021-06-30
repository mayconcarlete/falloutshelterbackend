import { DynamoDbRepository } from "./infra/dynamodb/repository";

const dynamo = new DynamoDbRepository()
dynamo.createTable()