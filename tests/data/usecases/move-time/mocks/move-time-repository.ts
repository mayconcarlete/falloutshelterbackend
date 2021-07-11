import { MoveTimeRepository } from '../../../../../src/data/interfaces/vault/move-time-repository'

export class MockMoveTimeRepository implements MoveTimeRepository {
  async move (date: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(date)
    })
  }
}
