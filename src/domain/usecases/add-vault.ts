import { Dweller, DwellerParams } from '../models/dweller'

export interface AddVault {
  create: (vault: DwellerParams) => Promise<Dweller>
}
