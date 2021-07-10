import { MoveTime } from "../../domain/usecases/move-time";
import { MoveTimeRepository } from "../interfaces/vault/move-time-repository";

export class MoveTimeUseCase implements MoveTime{
    constructor(
        private readonly moveTimeRepository: MoveTimeRepository
        ){}
    async moveTime(date: string): Promise<string> {
        const moveDate = await this.moveTimeRepository.move(date)
        return moveDate
    }
}