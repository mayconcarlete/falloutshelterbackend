import { IController } from "../../presentation/interfaces/controller";
import { THttpRequest } from "../../presentation/types/http";
import {Request, Response} from 'express'

export const adapterController = (controller:IController) => {
    return async(req:Request, res:Response)=>{
        const request:THttpRequest = {
            headers: req.headers,
            params: req.params,
            body: req.body
        }
        const response = await controller.handle(request)
        return res.status(response.statusCode).json(response.body)
    }
}