import { MoveTimeUseCase } from "../../../../src/data/usecases/move-time"
import { MoveTimeController } from "../../../../src/presentation/controllers/move-time"
import { IValidate } from "../../../../src/presentation/interfaces/validate"
import { THttpRequest } from "../../../../src/presentation/types/http"
import { RequiredField } from "../../../../src/presentation/validators/required-field"
import { MockMoveTime } from "./mocks/move-time"
import { MockValidator } from "./mocks/validate"

type SutTypes = {
    sut: MoveTimeController
    validators: IValidate
    moveTimeUseCase: MockMoveTime
}

const makeSut = ():SutTypes => {
    const validators = new MockValidator()
    const moveTimeUseCase = new MockMoveTime()
    const sut = new MoveTimeController(validators, moveTimeUseCase)
    return {sut, validators, moveTimeUseCase}
}

describe('Move Time Controllers', () => {
    test('Should throw in a bad request if validation fails', async() => {    
        const {sut, validators} = makeSut()
        jest.spyOn(validators, 'validate').mockImplementationOnce(() =>{
            throw new RequiredField('Validation Fails')
        })
        const request:THttpRequest = {
            body:{
                invalid_field:'any_value'
            }
        }
        const response = await sut.handle(request)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(new RequiredField('Validation Fails'))
    })
    test('Should call moveTimeUseCase with correct params', async() => {
        const {sut, moveTimeUseCase} = makeSut()         
        const moveTimeSpy = jest.spyOn(moveTimeUseCase, 'moveTime')
        const request:THttpRequest = {
            body:{
                date:'any_date'
            }
        }
        await sut.handle(request)
        expect(moveTimeSpy).toHaveBeenLastCalledWith('any_date')
    })
})