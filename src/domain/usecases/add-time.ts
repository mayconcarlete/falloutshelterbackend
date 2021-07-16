import { TimeFoward } from '../models/time'

export interface AddTime{
  create: () => Promise<TimeFoward>
}
