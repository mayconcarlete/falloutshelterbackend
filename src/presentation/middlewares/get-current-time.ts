import { LoadTimeUseCase } from "../../domain/usecases/load-time";
import { ok, serverError } from "../helpers/http-responses";
import { Middleware } from "../interfaces/middleware";
import { THttpRequest, THttpResponse } from "../types/http";

export class GetCurrentTimeMiddleware implements Middleware{
    constructor(
        private readonly loadTimeUseCase: LoadTimeUseCase,
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const currentTime = await this.loadTimeUseCase.getTime()
            return ok(currentTime)
        }catch(error){
            return serverError(error)
        }
    }
}