import mongoose from 'mongoose'
import { MoveTimeRepository } from "../../data/interfaces/vault/move-time-repository";
import { TimeFoward, TimeFowardParams } from '../../domain/models/time';
import { LoadTimeUseCase } from '../../domain/usecases/load-time';
import {MongoDB} from './helper'
import TimeRepository from './models/time'

export class MoveTimeInfra implements MoveTimeRepository{
    async add(timeFowardParams: TimeFowardParams):Promise<TimeFoward>{
        await TimeRepository.deleteMany()
        const time = timeFowardParams.time 
        const newDate = await TimeRepository.create({time})
        return MongoDB.mapObject(newDate)
    }
}