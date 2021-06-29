import { IController } from "../interfaces/controller";
import { IValidate } from "../interfaces/validate";
import { THttpRequest, THttpResponse } from "../types/http";

export class AddVaultController implements IController{
    constructor(
        private readonly validators: IValidate
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const body = request.body
            this.validators.validate(body)
            return new Promise((resolve, reject) => {
                const response: THttpResponse = {
                    statusCode: 200,
                    body: 'hello world'
                } 
                resolve(response)
            })
        }catch(error){
            return new Promise((resolve, reject) => {
                const response: THttpResponse = {
                    statusCode: 400,
                    body: error
                } 
                resolve(response)
            })
        }
    }
}