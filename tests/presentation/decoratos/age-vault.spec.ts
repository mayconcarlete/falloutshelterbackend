import { GetTime } from "../../../src/domain/usecases/get-time"
import { UpdateAgeDecorator } from "../../../src/presentation/decorators/age-vault"
import { IController } from "../../../src/presentation/interfaces/controller"
import { THttpRequest } from "../../../src/presentation/types/http"
import { MockController } from "./mocks/controller"
import { MockGetTime } from "./mocks/time"

type SutTypes = {
    sut: UpdateAgeDecorator,
    controller: IController,
    time: GetTime
}

const makeSut = ():SutTypes =>{
    const controller = new MockController()
    const time = new MockGetTime()
    const sut = new UpdateAgeDecorator(controller, time)
    return {sut, controller, time}
}

describe('UpdateAgeDecorator class', () => {
    test('Should return error if controller response is 4xx or 5xx', async() => {
        const {sut, controller} = makeSut()
        jest.spyOn(controller, 'handle').mockImplementationOnce(async() => {
            return new Promise((resolve, reject) => {
                resolve({
                    body:'dummy_value',
                    statusCode: 400
                })
            })
        })
        const request:THttpRequest = {
            time:'valid_time'
        }
        const response =await sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe('dummy_value')
    })
})