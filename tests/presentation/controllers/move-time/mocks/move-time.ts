import { MoveTime } from '../../../../../src/domain/usecases/move-time'

export class MockMoveTime implements MoveTime {
  async moveTime (date: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(date)
    })
  }
}
