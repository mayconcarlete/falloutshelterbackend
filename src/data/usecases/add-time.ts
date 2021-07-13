import { TimeFoward } from "../../domain/models/time";
import { AddTime } from "../../domain/usecases/add-time";
import { MoveTimeRepository } from "../interfaces/time/move-time-repository";

export class AddTimeUseCase implements AddTime{
    constructor(
        private readonly addTimeRepository: MoveTimeRepository
    ){}
    async create():Promise<TimeFoward> {
        return new Promise((resolve, reject) => {
            
        })
    }
}