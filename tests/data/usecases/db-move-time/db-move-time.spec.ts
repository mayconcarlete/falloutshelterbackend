import { rejects } from "assert/strict"
import { MoveTimeRepository } from "../../../../src/data/interfaces/vault/move-time-repository"
import { DbMoveTime } from "../../../../src/data/usecases/db-move-time"
import { MoveTime } from "../../../../src/domain/usecases/time-foward"
import { IValidate } from "../../../../src/presentation/interfaces/validate"
import { MockMoveTimeRepository } from "./mocks/move-time-repository"
import { MockValidator } from "./mocks/validator"

type SutTypes = {
    sut: MoveTime,
    checkDateFormat: IValidate
    moveTimeRepository: MoveTimeRepository
}

const makeSut = ():SutTypes => {
    const moveTimeRepository = new MockMoveTimeRepository()
    const checkDateFormat = new MockValidator()
    const sut = new DbMoveTime(checkDateFormat, moveTimeRepository)
    return {sut, checkDateFormat, moveTimeRepository}
}

describe('Db Move Time', () => {
    test('Should throw if date provided is invalid', async() => {
        const {sut, checkDateFormat} = makeSut()
        jest.spyOn(checkDateFormat, 'validate').mockImplementationOnce(() => {
            throw new Error('Check Date Throws')
        })
        try{
            const date = "invalid_date"
            await sut.moveTime(date)
        }catch(error){
            expect(error).toEqual(new Error('Check Date Throws'))
        }
    })
    test('Should throw if moveTimeRepository throws', async() => {
        const {sut, moveTimeRepository} = makeSut()
        jest.spyOn(moveTimeRepository, 'move').mockImplementationOnce(async() => {
            return new Promise((resolve, reject) => {
                throw new Error('MoveTimeRepository throws')
            })
        })
        try{
            const date = 'valid_date'
            await sut.moveTime(date)
        }catch(error){
            expect(error).toEqual(new Error('MoveTimeRepository throws'))
        }
    })
})