import { Dweller } from '../models/dweller'

export interface QueryDweller {
  query: (dwellerParams: any) => Promise<Dweller[]>
}
