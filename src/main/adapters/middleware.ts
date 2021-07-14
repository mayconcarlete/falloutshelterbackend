import {Response, Request, NextFunction} from 'express'
import { Middleware } from '../../presentation/interfaces/middleware'
import { THttpRequest } from '../../presentation/types/http'

export const adapterMiddleware = (middleware: Middleware) => {
    return async(req:Request, res:Response, next: NextFunction) =>{
        const request:THttpRequest = {
            headers: req.headers,
            params: req.params,
            body: req.body
        }
        const response = await middleware.handle(request)
        if(response.statusCode === 200){
            Object.assign(req, response.body)
            next()
        } else {
            res.status(response.statusCode).json(response.body)
        }
    }
}