import {Express} from 'express'
import { adapterController } from '../adapters/controller'
import { makeMoveTimeController } from '../factory/move-time/make-move-time'
export const moveTimeFoward = (app:Express):void => {
    const moveTimeController = makeMoveTimeController()
    app.post('/move-time', adapterController(moveTimeController))
}