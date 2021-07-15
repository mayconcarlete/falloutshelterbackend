import { AddTimeRepository } from '../../data/interfaces/time/add-time';
import { GetTimeRepository } from '../../data/interfaces/time/get-time';
import { TimeFoward, TimeFowardParams } from '../../domain/models/time';
import {MongoDB} from './helper'
import TimeRepository from './models/time'

export class MoveTimeRepository implements AddTimeRepository, GetTimeRepository{
    async get():Promise<TimeFoward> {
        const time = await TimeRepository.find()
        if(time.length === 0){
            const getDefaultTime = this.createDefaultTime()
            return await this.add({time:getDefaultTime})
        }
        const map =  MongoDB.mapObject(time[0])
        return map
    }
    async add(timeFowardParams: TimeFowardParams):Promise<TimeFoward>{
        await TimeRepository.deleteMany()
        const time = timeFowardParams.time 
        const newDate = await TimeRepository.create({time})
        return MongoDB.mapObject(newDate)
    }
    createDefaultTime():string{
        const time = new Date(Date.now())
        return `${time.getUTCFullYear()}-${time.getUTCMonth() +1}-${time.getUTCDate()}`
    }
}