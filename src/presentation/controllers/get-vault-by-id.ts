import { badRequest, ok, serverError } from "../helpers/http-responses";
import { IController } from "../interfaces/controller";
import { IValidate } from "../interfaces/validate";
import { THttpRequest, THttpResponse } from "../types/http";
import { RequiredField } from "../validators/required-field";

export class GetVaultByIdController implements IController {
    constructor(
        private readonly validators: IValidate
    ){}
    handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const body = request.body
            this.validators.validate(body)
            return new Promise((resolve, reject) => {
                resolve(ok({}))
            })
        }catch(error){
            if(error instanceof RequiredField || error instanceof TypeError ) return new Promise((resolve, reject) => {
                resolve(badRequest(error))
            }) 
            return new Promise((resolve, reject)=>{
                resolve(serverError(error))
            })
        }
    }
}