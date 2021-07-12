import mongoose from 'mongoose'
import { MoveTimeRepository } from "../../data/interfaces/vault/move-time-repository";
import {MongoDB} from './helper'
import TimeRepository from './models/time'

export class MoveTimeInfra implements MoveTimeRepository{
    async add(date: string):Promise<string>{
        await TimeRepository.deleteMany()
        const newDate = await TimeRepository.create({time:date})
        return MongoDB.mapObject(newDate)
    }
}