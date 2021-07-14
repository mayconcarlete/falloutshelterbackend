import { GetTimeUseCase } from "../../../../data/usecases/get-time";
import { MoveTimeInfra } from "../../../../infra/mongodb/move-time";
import { GetTimeMiddleware } from "../../../../presentation/middlewares/get-current-time";

export const makeGetTime = () => {
    const getTimeRepository = new MoveTimeInfra()
    const getTimeUseCase = new GetTimeUseCase(getTimeRepository)
    const getTimeMiddleware = new GetTimeMiddleware(getTimeUseCase)
    return getTimeMiddleware 
}