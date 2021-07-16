import { TimeFoward, TimeFowardParams } from '../../domain/models/time'
import { MoveTime } from '../../domain/usecases/move-time'
import { AddTimeRepository } from '../interfaces/time/add-time'

export class MoveTimeUseCase implements MoveTime {
  constructor (
    private readonly moveTimeRepository: AddTimeRepository
  ) {}

  async moveTime (timeFowardParams: TimeFowardParams): Promise<TimeFoward> {
    const moveDate = await this.moveTimeRepository.add(timeFowardParams)
    return moveDate
  }
}
