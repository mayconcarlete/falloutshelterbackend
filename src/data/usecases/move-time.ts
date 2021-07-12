import { TimeFoward, TimeFowardParams } from '../../domain/models/time'
import { MoveTime } from '../../domain/usecases/move-time'
import { MoveTimeRepository } from '../interfaces/vault/move-time-repository'

export class MoveTimeUseCase implements MoveTime {
  constructor (
    private readonly moveTimeRepository: MoveTimeRepository
  ) {}

  async moveTime(timeFowardParams: TimeFowardParams):Promise<TimeFoward>{
    const moveDate = await this.moveTimeRepository.add(timeFowardParams)
    return moveDate
  }
}
