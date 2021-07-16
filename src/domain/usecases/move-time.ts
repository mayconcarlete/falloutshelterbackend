import { TimeFoward, TimeFowardParams } from '../models/time'

export interface MoveTime {
  moveTime: (timeFowardParams: TimeFowardParams) => Promise<TimeFoward>
}
