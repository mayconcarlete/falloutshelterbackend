import { DbGetVaultById } from "../../../data/usecases/db-get-vault-by-id"
import { DynamoDbRepository } from "../../../infra/dynamodb/repository"
import { GetVaultByIdController } from "../../../presentation/controllers/get-vault-by-id"
import {makeGetVaultByIdValitors} from './make-validations'
export const makeGetVaultByIdController = ():GetVaultByIdController => {
    
    const validators = makeGetVaultByIdValitors()

    const config = {
        'endpoint': 'http://localhost:8000',
        'region': 'us-east-1',
        'accessKeyId': 'DUMMY_ID',
        'secretAccessKey': 'DUMMY_KEY'
    }
    const repository = new DynamoDbRepository(config)
    const getVaultById = new DbGetVaultById(repository)
    
    const getVaultByIdController = new GetVaultByIdController(validators, getVaultById)
    return getVaultByIdController
}