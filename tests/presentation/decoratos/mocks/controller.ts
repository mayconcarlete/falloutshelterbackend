import { IController } from "../../../../src/presentation/interfaces/controller";
import { THttpRequest, THttpResponse } from "../../../../src/presentation/types/http";

export class MockController implements IController{
    handle(request: THttpRequest):Promise<THttpResponse> {
        return new Promise((resolve, reject)=> {
            resolve({
                body: 'valid_value',
                statusCode: 200
            })
        })
    }
}