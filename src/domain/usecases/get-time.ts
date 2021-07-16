import { TimeFoward } from '../models/time'

export interface GetTime {
  getTime: () => Promise<TimeFoward>
}
