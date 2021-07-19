import { AddDwellerRepository } from '../../data/interfaces/dweller/add-dweller'
import { GetVaultByIdRepository } from '../../data/interfaces/dweller/get-vault-by-id'
import { QueryDwellerRepository } from '../../data/interfaces/dweller/query-dweller'
import { DwellerParams, Dweller } from '../../domain/models/dweller'
import DwellerRepositoryModel from './models/dweller'
import { MongoDB } from './helper'

export class DwellerRepository implements AddDwellerRepository, GetVaultByIdRepository, QueryDwellerRepository {
  async get (id: string): Promise<Dweller | null> {
    try {
      const dweller = await DwellerRepositoryModel.findById(id)
      return MongoDB.mapObject(dweller)
    } catch (error) {
      return null
    }
  }

  async query (params: any): Promise<Dweller[]> {
    const dwellerQueryResult = await DwellerRepositoryModel.find(params)
    const mapDwellers = dwellerQueryResult.map(dweller => MongoDB.mapObject(dweller))
    return mapDwellers
  }

  async add (dweller: DwellerParams): Promise<Dweller> {
    const addedDweller = await DwellerRepositoryModel.create(dweller)
    return MongoDB.mapObject(addedDweller)
  }
}
