import { TimeFoward } from "../../domain/models/time";
import { GetTime } from "../../domain/usecases/get-time";
import { GetTimeRepository } from "../interfaces/time/get-time";

export class GetTimeUseCase implements GetTime{
    constructor(
        private readonly getTimeRepository: GetTimeRepository
    ){}
    async getTime(): Promise<TimeFoward> {
        const time = await this.getTimeRepository.get()
        return time
    }
}