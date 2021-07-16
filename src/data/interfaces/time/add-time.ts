import { TimeFoward, TimeFowardParams } from '../../../domain/models/time'

export interface AddTimeRepository {
  add: (timeFowardParams: TimeFowardParams) => Promise<TimeFoward>
}
