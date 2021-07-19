import { Dweller } from '../../../domain/models/dweller'

export interface QueryDwellerRepository{
  query: (params: any) => Promise<Dweller[]>
}
