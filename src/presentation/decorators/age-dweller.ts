import { Dweller } from '../../domain/models/dweller'
import { GetTime } from '../../domain/usecases/get-time'
import { IController } from '../interfaces/controller'
import { THttpRequest, THttpResponse } from '../types/http'

export class UpdateAgeDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly time: GetTime
  ) {}

  async handle (request: THttpRequest): Promise<THttpResponse> {
    const response = await this.controller.handle(request)
    if (this.wasRequestSuccess(response.statusCode)) {
      const { time } = await this.time.getTime()
      if (this.isBodyArray(response.body)) {
        const updateArrayOfDwellers = this.updateArrayAge(response.body, time)
        return { ...response, body: updateArrayOfDwellers }
      } else {
        const updatedDweller = this.updateAge(response.body, time)
        return { ...response, body: updatedDweller }
      }
    }
    return response
  }

  wasRequestSuccess (statusCode: number): boolean {
    return statusCode === 200
  }

  isBodyArray (body: any): boolean {
    return Array.isArray(body)
  }

  updateArrayAge (dwellersArray: Dweller[], time: string): Dweller[] {
    const updatedDwellerAge = dwellersArray.map(dweller => this.updateAge(dweller, time))
    return updatedDwellerAge
  }

  updateAge (dweller: Dweller, time: string): Dweller {
    const millisecondsDiff = new Date(time).getTime() - new Date(dweller.age).getTime()
    const years = `${Math.trunc(millisecondsDiff / 31536000000)}`
    return { ...dweller, age: years }
  }
}
