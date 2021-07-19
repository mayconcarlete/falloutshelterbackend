import { ParseParamsUpper } from '../../../../src/data/helpers/parse-object-uppercase'
import { RemoveUndefinedParams } from '../../../../src/data/helpers/remove-undefined-params'
import { RemoveParams } from '../../../../src/data/interfaces/helpers/remove-undefined-params'
import { QueryDwellerRepository } from '../../../../src/data/interfaces/dweller/query-dweller'
import { QueryDwellerUseCase } from '../../../../src/data/usecases/query-dweller'
import { QueryDweller } from '../../../../src/domain/usecases/query-dweller'
import { MockQueryVaultRepository } from './mocks/query-vault-repository'

type SutTypes = {
  sut: QueryDweller
  removeUndefinedParams: RemoveParams
  parseParamsUpperCase: ParseParamsUpper
  queryVaultRepository: QueryDwellerRepository
}

const makeSut = (): SutTypes => {
  const fields = ['age', 'eyeColor', 'name', 'hairColor']
  const removeUndefinedParams = new RemoveUndefinedParams(fields)
  const parseParamsUpperCase = new ParseParamsUpper()
  const queryVaultRepository = new MockQueryVaultRepository()
  const sut = new QueryDwellerUseCase(removeUndefinedParams, parseParamsUpperCase, queryVaultRepository)
  return { sut, removeUndefinedParams, parseParamsUpperCase, queryVaultRepository }
}

describe('Db Query Vault', () => {
  test('Should call removeUndefinedParams with correct paras', async () => {
    const { sut, removeUndefinedParams } = makeSut()
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
  test('Should parse valid params to uppercase', async () => {
    const { sut, parseParamsUpperCase } = makeSut()
    const queryParams = {
      age: 'valid_age',
      eyeColor: undefined,
      name: 'valid_name',
      hairColor: 'green'
    }
    const parseUpperCase = {
      age: 'VALID_AGE',
      name: 'VALID_NAME',
      hairColor: 'GREEN'
    }
    sut.query(queryParams)
    expect(parseParamsUpperCase.paramsUpperCase).toEqual(parseUpperCase)
  })
  test('Should throw when query repository throws', async () => {
    const { sut, queryVaultRepository } = makeSut()
    jest.spyOn(queryVaultRepository, 'query').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error()
      })
    })
    const queryParams = {
      age: 'valid_age',
      eyeColor: undefined,
      name: 'valid_name',
      hairColor: 'green'
    }
    try {
      await sut.query(queryParams)
    } catch (e) {
      expect(e).toEqual(new Error())
    }
  })
  test('Should return an array with Vaults when query repository is successful', async () => {
    const { sut } = makeSut()
    const queryParams = {
      age: 'valid_age',
      eyeColor: undefined,
      name: 'valid_name',
      hairColor: 'green'
    }
    const response = await sut.query(queryParams)
    expect(response).toEqual([{
      id: 'valid_id',
      age: '2020-07-02',
      eyeColor: 'BROWN',
      name: 'MAYCON',
      hairColor: 'BROWN'
    }])
  })
})
