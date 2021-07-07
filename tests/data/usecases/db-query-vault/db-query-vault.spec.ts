import { ParseParamsUpper } from "../../../../src/data/helpers/parse-object-uppercase"
import { RemoveUndefinedParams } from "../../../../src/data/helpers/remove-undefined-params"
import { RemoveParams } from "../../../../src/data/interfaces/helpers/remove-undefined-params"
import { QueryVaultRepository } from "../../../../src/data/interfaces/vault/query-vault-repository"
import { DbQueryVault } from "../../../../src/data/usecases/db-query-vault"
import { QueryVault } from "../../../../src/domain/usecases/query-vault"
import { MockQueryVaultRepository } from "./mocks/query-vault-repository"

type SutTypes = {
    sut:QueryVault
    removeUndefinedParams: RemoveParams
    parseParamsUpperCase: ParseParamsUpper
    queryVaultRepository: QueryVaultRepository
}

const makeSut = ():SutTypes =>{
    const removeUndefinedParams = new RemoveUndefinedParams()
    const parseParamsUpperCase = new ParseParamsUpper()
    const queryVaultRepository = new MockQueryVaultRepository()
    const sut = new DbQueryVault(removeUndefinedParams, parseParamsUpperCase, queryVaultRepository)
    return {sut, removeUndefinedParams, parseParamsUpperCase, queryVaultRepository}
}

describe('Db Query Vault', () => {
    test('Should call removeUndefinedParams with correct paras', async () =>{
        const {sut, removeUndefinedParams} = makeSut()
        const queryParams = {
            age: 'valid_age',
            eyeColor: undefined,
            name: 'valid_name',
            hairColor: 'green',
            id: null
        }
        const removeUndefinedSpy = jest.spyOn(removeUndefinedParams, 'remove')
        sut.query(queryParams)
        expect(removeUndefinedSpy).toHaveBeenCalledWith(queryParams)
    })
    test('Should parse valid params to uppercase', async() => {
        const {sut, parseParamsUpperCase} = makeSut()
        const queryParams = {
            age: 'valid_age',
            eyeColor: undefined,
            name: 'valid_name',
            hairColor: 'green',
        }
        const parseUpperCase = {
            age: 'valid_age',
            name: 'valid_name',
            hairColor: 'green',
        }
        sut.query(queryParams)
        expect(parseParamsUpperCase.params).toEqual(parseUpperCase)
    })
    test('Should throw when query repository throws', async() => {
        const {sut, queryVaultRepository} = makeSut()
        jest.spyOn(queryVaultRepository, 'query').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => {
              throw new Error()
            })
          })
        const queryParams = {
            age: 'valid_age',
            eyeColor: undefined,
            name: 'valid_name',
            hairColor: 'green',
        }
        try{
            await sut.query(queryParams)
        }catch(e){
            expect(e).toEqual(new Error())
        }
    })
})