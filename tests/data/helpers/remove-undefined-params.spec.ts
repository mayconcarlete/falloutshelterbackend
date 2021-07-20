import { RemoveUndefinedParams } from '../../../src/data/helpers/remove-undefined-params'

describe('Remove undefined Params', () => {
  test('Should call remove with correct params', () => {
    const fields = ['age', 'hairColor', 'eyeColor', 'name']
    const sut = new RemoveUndefinedParams(fields)
    const dwellerParams = {
      param0: null,
      param1: 'valid_value',
      param2: 'valid_value',
      param3: undefined
    }
    const removeSpy = jest.spyOn(sut, 'remove')
    sut.remove(dwellerParams)
    expect(removeSpy).toHaveBeenCalledWith(dwellerParams)
  })
  test('should remove undefined or null params to query', () => {
    const fields = ['age', 'hairColor', 'eyeColor', 'name']
    const sut = new RemoveUndefinedParams(fields)
    const dwellerParams = {
      param0: null,
      param1: 'valid_value',
      param2: 'valid_value',
      param3: undefined
    }
    const response = sut.remove(dwellerParams)
    expect(response).toEqual({})
  })
  test('should remove undefined or null params to query and let valid values', () => {
    const fields = ['age', 'hairColor', 'eyeColor', 'name']
    const sut = new RemoveUndefinedParams(fields)
    const dwellerParams = {
      age: null,
      hairColor: 'valid_value',
      eyeColor: 'valid_value',
      name: undefined
    }
    const response = sut.remove(dwellerParams)
    expect(response).toEqual({
      hairColor: 'valid_value',
      eyeColor: 'valid_value'
    })
  })
})
