import { badRequest, ok } from "../helpers/http-responses";
import { IController } from "../interfaces/controller";
import { IValidate } from "../interfaces/validate";
import { THttpRequest, THttpResponse } from "../types/http";

export class UpdateVaultController implements IController {
    constructor(
        private readonly validators: IValidate
    ) { }
    handle(request: THttpRequest): Promise<THttpResponse> {
        try {
            const id = request.params.id
            const body = { ...request.body, id }
            this.validators.validate(body)
            return new Promise((resolve, reject) => {
                resolve(ok('ok'))
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                resolve(badRequest(error))
            })
        }
    }
}