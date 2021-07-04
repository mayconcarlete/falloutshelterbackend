import { GetVaultById } from "../../domain/usecases/get-vault-by-id";
import { NotFoundError } from "../errors/not-found";
import { RequiredFieldError } from "../errors/required-field";
import { badRequest, notFound, ok, serverError } from "../helpers/http-responses";
import { IController } from "../interfaces/controller";
import { IValidate } from "../interfaces/validate";
import { THttpRequest, THttpResponse } from "../types/http";
import { RequiredField } from "../validators/required-field";

export class GetVaultByIdController implements IController {
    constructor(
        private readonly validators: IValidate,
        private readonly getVaultById: GetVaultById
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const body = request.body
            this.validators.validate(body)

            const {id} = body.id
            const vault = await this.getVaultById.getById(id)
            return ok(vault)

        }catch(error){
            if(error instanceof RequiredFieldError || error instanceof TypeError ) return badRequest(error)
            else if(error instanceof NotFoundError) return notFound(error) 
            return serverError(error)
        }
    }
}