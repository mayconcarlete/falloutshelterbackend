import { DwellerParams, Dweller } from '../../domain/models/dweller'
import { AddDweller } from '../../domain/usecases/add-dweller'
import { AddDwellerRepository } from '../interfaces/dweller/add-dweller'

export class AddDwellerUseCase implements AddDweller {
  constructor (
    private readonly addDwellerRepository: AddDwellerRepository
  ) {}

  async create (dweller: DwellerParams): Promise<Dweller> {
    const dwellerUpperCase = this.passFieldsToUpperCase(dweller)
    const addedDweller = await this.addDwellerRepository.add(dwellerUpperCase)
    return addedDweller
  }

  passFieldsToUpperCase (dweller: DwellerParams): DwellerParams {
    return {
      age: dweller.age,
      eyeColor: dweller.eyeColor.toUpperCase(),
      hairColor: dweller.hairColor.toUpperCase(),
      name: dweller.name.toUpperCase()
    }
  }
}
