import { MoveTimeRepository } from '../../../../../src/data/interfaces/time/move-time-repository'
import { TimeFowardParams, TimeFoward } from '../../../../../src/domain/models/time'

export class MockMoveTimeRepository implements MoveTimeRepository {
  add(timeFowardParams: TimeFowardParams):Promise<TimeFoward>{
    return new Promise((resolve, reject) => {
      resolve({
        id:'valid_id',
        time: 'valid_time'
      })
    })
  }
}
