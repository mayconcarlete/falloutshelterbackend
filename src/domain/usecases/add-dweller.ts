import { Dweller, DwellerParams } from '../models/dweller'

export interface AddDweller {
  create: (dweller: DwellerParams) => Promise<Dweller>
}
