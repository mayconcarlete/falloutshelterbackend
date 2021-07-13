import { TimeFoward } from "../models/time";

export interface LoadTimeUseCase {
    getTime():Promise<TimeFoward>
}