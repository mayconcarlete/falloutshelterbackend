import { THttpResponse } from "../types/http"

export const ok = (data: any):THttpResponse => {
    return {
        statusCode: 200,
        body: data
    }
}

export const badRequest = (error: Error):THttpResponse => {
    return {
        statusCode: 400,
        body: error
    }
}