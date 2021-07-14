import { AddTimeRepository } from '../../../../../src/data/interfaces/time/add-time'
import { TimeFowardParams, TimeFoward } from '../../../../../src/domain/models/time'

export class MockMoveTimeRepository implements AddTimeRepository {
  add(timeFowardParams: TimeFowardParams):Promise<TimeFoward>{
    return new Promise((resolve, reject) => {
      resolve({
        id:'valid_id',
        time: 'valid_time'
      })
    })
  }
}
