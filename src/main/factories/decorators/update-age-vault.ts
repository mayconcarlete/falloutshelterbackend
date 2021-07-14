import { GetTimeUseCase } from "../../../data/usecases/get-time"
import { MoveTimeInfra } from "../../../infra/mongodb/move-time"
import { UpdateAgeDecorator } from "../../../presentation/decorators/age-vault"
import { IController } from "../../../presentation/interfaces/controller"

export const makeUpdateAgeDecorator = (controller: IController):IController => {
    const getTimeRepository = new MoveTimeInfra()
    const getTimeUseCase = new GetTimeUseCase(getTimeRepository)
    const updateAgeDecorator = new UpdateAgeDecorator(controller, getTimeUseCase)
    return updateAgeDecorator
}