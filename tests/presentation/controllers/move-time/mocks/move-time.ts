import { TimeFowardParams, TimeFoward } from '../../../../../src/domain/models/time'
import { MoveTime } from '../../../../../src/domain/usecases/move-time'

export class MockMoveTime implements MoveTime {
  async moveTime (timeFowardParams: TimeFowardParams): Promise<TimeFoward> {
    return new Promise((resolve, reject) => {
      resolve({
        id: 'valid_id',
        time: 'valid_date'
      })
    })
  }
}
