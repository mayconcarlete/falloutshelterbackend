import { IController } from "../interfaces/controller";
import { THttpRequest, THttpResponse } from "../types/http";

export class AddVaultController implements IController{
    async handle(request: THttpRequest): Promise<THttpResponse> {
        return new Promise((resolve, reject) => {
            const response:THttpResponse = {
                statusCode: 200,
                body: 'any_value'
            }
            resolve(response)
        })
    }
}