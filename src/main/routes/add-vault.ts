import {Express} from 'express'
import { adapterController } from '../adapters/controller'
import { makeAddVaultController } from '../factory/add-vault/make-add-vault'

export const addVault = (app:Express) => {
    const addVault = makeAddVaultController()
    app.post('/add-vault', adapterController(addVault))
}