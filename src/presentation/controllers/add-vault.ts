import { VaultParams } from "../../domain/models/vault";
import { AddVault } from "../../domain/usecases/add-vault";
import { badRequest, ok } from "../helpers/http-responses";
import { IController } from "../interfaces/controller";
import { IValidate } from "../interfaces/validate";
import { THttpRequest, THttpResponse } from "../types/http";

export class AddVaultController implements IController{
    constructor(
        private readonly validators: IValidate,
        private readonly addVaultUseCase: AddVault
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const body = request.body
            this.validators.validate(body)
            
            const {name, age, hairColor, eyeColor } = request.body 
            const addVault = await this.addVaultUseCase.create({name, age, hairColor, eyeColor})
            
            return ok(addVault)

        }catch(error){
            return badRequest(error)
        }
    }
}