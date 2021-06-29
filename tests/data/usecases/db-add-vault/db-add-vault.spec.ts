import { DbAddVault } from "../../../../src/data/usecases/db-add-vault"
import { VaultParams } from "../../../../src/domain/models/vault"

type SutTypes = {
    sut: DbAddVault
}

const makeSut = ():SutTypes => {
    const sut = new DbAddVault()
    return {sut}
}

describe('Db Add Vault', () => {
    test('Should pass fields to uppercase', () => {
        const { sut } = makeSut()
        const vault:VaultParams = {
            age:1,
            eyeColor: 'brown',
            name: 'Maycon',
            hairColor: 'brown'
        }
        const expected_response:VaultParams = {
            age:1,
            eyeColor: 'BROWN',
            name: 'MAYCON',
            hairColor: 'BROWN'
        } 
        expect(sut.passFieldsToUpperCase(vault)).toEqual(expected_response)
    })
})