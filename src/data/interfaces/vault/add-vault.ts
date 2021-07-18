import { Dweller, DwellerParams } from '../../../domain/models/dweller'

export interface AddVaultRepository {
  add: (vault: DwellerParams) => Promise<Dweller>
}
