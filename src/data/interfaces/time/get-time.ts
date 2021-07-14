import { TimeFoward } from "../../../domain/models/time";

export interface GetTimeRepository{
    get():Promise<TimeFoward>
}