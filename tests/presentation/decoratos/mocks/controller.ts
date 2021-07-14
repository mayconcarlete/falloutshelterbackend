import { IController } from "../../../../src/presentation/interfaces/controller";
import { THttpRequest, THttpResponse } from "../../../../src/presentation/types/http";

export class MockController implements IController{
    handle(request: THttpRequest):Promise<THttpResponse> {
        return new Promise((resolve, reject)=> {
            resolve({
                body: {
                    "age": "1990-07-16",
                    "eyeColor": "GREEN",
                    "hairColor": "RED",
                    "name": "MAYCON",
                    "id": "60eeba261d34ddfe200f35ac"
                },
                statusCode: 200
            })
        })
    }
}