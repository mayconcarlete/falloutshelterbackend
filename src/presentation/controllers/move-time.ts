import { badRequest } from "../helpers/http-responses";
import { IController } from "../interfaces/controller";
import { IValidate } from "../interfaces/validate";
import { THttpRequest, THttpResponse } from "../types/http";
import { RequiredField } from "../validators/required-field";

export class MoveTimeController implements IController {
    constructor(
        private readonly validators: IValidate
    ){}
    async handle(request: THttpRequest):Promise<THttpResponse>{
        try{
            const body = request.body
            this.validators.validate(body)
            return new Promise((resolve, reject) => {
                resolve({statusCode:200, body:'ok'})
            })
        }catch(error){
            if(error instanceof RequiredField){
                return new Promise((resolve, reject) => {
                    resolve(badRequest(error))
                })
            }
            return new Promise((resolve, reject) => {
                resolve({statusCode:500, body:'ok'})
            })
        }
    }
}