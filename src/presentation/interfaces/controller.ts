import { THttpRequest, THttpResponse } from "../types/http";

export interface IController  {
    handle(request:THttpRequest):Promise<THttpResponse>
}