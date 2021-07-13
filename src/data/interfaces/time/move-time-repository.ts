import { TimeFoward, TimeFowardParams } from "../../../domain/models/time";

export interface MoveTimeRepository {
  add: (timeFowardParams: TimeFowardParams) => Promise<TimeFoward>
}
