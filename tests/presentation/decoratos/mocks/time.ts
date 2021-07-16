import { TimeFoward } from '../../../../src/domain/models/time'
import { GetTime } from '../../../../src/domain/usecases/get-time'

export class MockGetTime implements GetTime {
  async getTime (): Promise<TimeFoward> {
    return new Promise((resolve, reject) => {
      resolve({
        id: 'valid_id',
        time: '2020-02-06'
      })
    })
  }
}
