import { GetTime } from "../../domain/usecases/get-time";
import { ok, serverError } from "../helpers/http-responses";
import { Middleware } from "../interfaces/middleware";
import { THttpRequest, THttpResponse } from "../types/http";

export class GetTimeMiddleware implements Middleware{
    constructor(
        private readonly getTimeUseCase: GetTime
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const currentTime = await this.getTimeUseCase.getTime()
            return ok(currentTime)
        }catch(error){
            return serverError(error)
        }
    }
}