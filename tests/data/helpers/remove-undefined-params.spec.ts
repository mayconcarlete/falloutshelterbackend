import { RemoveUndefinedParams } from "../../../src/data/helpers/remove-undefined-params"

describe('Remove undefined Params', () =>{
    test('Should call remove with correct params', () =>{
        const sut = new RemoveUndefinedParams()
        const vaultParams = {
            param0: null,
            param1: 'valid_value',
            param2: 'valid_value',
            param3: undefined
        }
        const removeSpy = jest.spyOn(sut, 'remove')
        sut.remove(vaultParams)
        expect(removeSpy).toHaveBeenCalledWith(vaultParams)
    })
    test('should remove undefined or null params to query', () => {
        const sut = new RemoveUndefinedParams()
        const vaultParams = {
            param0: null,
            param1: 'valid_value',
            param2: 'valid_value',
            param3: undefined
        }
        const response = sut.remove(vaultParams)
        expect(response).toEqual({
            param1: 'valid_value',
            param2: 'valid_value'
        })
    })
})