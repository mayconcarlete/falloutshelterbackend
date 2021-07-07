import { ParseParamsUpper } from "../../../src/data/helpers/parse-object-uppercase"

describe('Parse Object Uppercase', () => {
    test('Should call parse method with correct params', () => {
        const sut = new ParseParamsUpper()
        const params = {
            param0: 'a',
            param1: 'b',
            param2: 'c'
        }
        const paramsSpy = jest.spyOn(sut, 'parse')
        sut.parse(params)
        expect(paramsSpy).toHaveBeenCalledWith(params)        
    })
})