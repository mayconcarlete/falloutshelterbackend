import { Express } from 'express'
import { adapterController } from '../adapters/controller'
import { makeQueryVaultController } from '../factory/query-vault/make-query-vault'

export const queryVault = (app:Express):void => {
    const makeQueryController = makeQueryVaultController()
    app.post('/query-vault', adapterController(makeQueryController))
}