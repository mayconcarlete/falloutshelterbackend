import { ParseParamsUpper } from '../../../src/data/helpers/parse-object-uppercase'

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
  test('Should pass parameter to uppercase', () => {
    const sut = new ParseParamsUpper()
    const params = {
      param0: 'a',
      param1: 'b',
      param2: 'c'
    }
    const response = sut.parse(params)
    expect(response).toEqual({
      param0: 'A',
      param1: 'B',
      param2: 'C'
    }

    )
  })
})
