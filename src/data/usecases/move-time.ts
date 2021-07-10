import { MoveTime } from "../../domain/usecases/time-foward";
import { IValidate } from "../../presentation/interfaces/validate";
import { MoveTimeRepository } from "../interfaces/vault/move-time-repository";

export class MoveTimeUseCase implements MoveTime{
    constructor(
        private readonly checkDateFormat: IValidate,
        private readonly moveTimeRepository: MoveTimeRepository
        ){}
    async moveTime(date: string): Promise<string> {
        this.checkDateFormat.validate(date)
        const moveDate = await this.moveTimeRepository.move(date)
        return moveDate
    }
}