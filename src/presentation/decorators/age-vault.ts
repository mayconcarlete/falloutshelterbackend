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
    if (this.wasSuccess(response.statusCode)) {
      const { time } = await this.time.getTime()
      if (this.isBodyArray(response.body)) {
        const updatedArrVault = this.updateArrayAge(response.body, time)
        return { ...response, body: updatedArrVault }
      } else {
        const updatedVault = this.updateAge(response.body, time)
        return { ...response, body: updatedVault }
      }
    }
    return response
  }

  wasSuccess (statusCode: number): boolean {
    return statusCode === 200
  }

  isBodyArray (body: any): boolean {
    return Array.isArray(body)
  }

  updateArrayAge (arrVault: Dweller[], time: string): Dweller[] {
    const updatedAgeVault = arrVault.map(vault => this.updateAge(vault, time))
    return updatedAgeVault
  }

  updateAge (vault: Dweller, time: string): Dweller {
    const millisecondsDiff = new Date(time).getTime() - new Date(vault.age).getTime()
    const years = `${Math.trunc(millisecondsDiff / 31536000000)}`
    return { ...vault, age: years }
  }
}
