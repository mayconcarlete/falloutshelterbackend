import { MoveTimeUseCase } from "../../../data/usecases/move-time";
import { MoveTimeInfra } from "../../../infra/mongodb/move-time";
import { MoveTimeController } from "../../../presentation/controllers/move-time";
import { makeMoveTimeValidators } from "./make-validators";

export const makeMoveTimeController = ():MoveTimeController => {
    const validators = makeMoveTimeValidators()
    const moveTimeRepository = new MoveTimeInfra()
    const moveTimeUseCase = new MoveTimeUseCase(moveTimeRepository)
    const moveTimeController = new MoveTimeController(validators, moveTimeUseCase)

    return moveTimeController
}