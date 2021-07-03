import { DynamoDB } from "aws-sdk"
import { DbAddVault } from "../data/usecases/db-add-vault"
import { DynamoDbRepository } from "../infra/dynamodb/repository"
import { AddVaultController } from "../presentation/controllers/add-vault"
import { IValidate } from "../presentation/interfaces/validate"
import { THttpRequest, THttpResponse } from "../presentation/types/http"
import { RequiredField } from "../presentation/validators/required-field"
import { ValidatorComposite } from "../presentation/validators/validator-composite"

export const makeCreate = async (request:any):Promise<THttpResponse> => {
    const validators: IValidate[] = [
        new RequiredField('name')
    ]
    const validatorComposite = new ValidatorComposite(validators)

    const addRepository = new DynamoDbRepository()
    const addVaultData = new DbAddVault(addRepository)

    const controller = new AddVaultController(validatorComposite, addVaultData)

    const req:THttpRequest = {
        body: request.body,
        headers: request.headers,
        params: request.params
    }

    const response = await controller.handle(req)
    return {
        statusCode: response.statusCode,
        body: response.body
    }
}