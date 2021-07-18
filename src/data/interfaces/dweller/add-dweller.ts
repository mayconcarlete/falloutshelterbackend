import { Dweller, DwellerParams } from '../../../domain/models/dweller'

export interface AddDwellerRepository {
  add: (dweller: DwellerParams) => Promise<Dweller>
}
