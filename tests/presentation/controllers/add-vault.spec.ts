import { AddVaultController } from "../../../src/presentation/controllers/add-vault"

type SutTypes = {
    sut: AddVaultController
}
const makeSut = ():SutTypes => {
    const sut  = new AddVaultController()
    return {sut}
}
describe('Add Vault Controller', () => {
    test('Should return 200 when add vault with success', async () => {
        const {sut} = makeSut()
        const response = await sut.handle({})
        expect(response.statusCode).toBe(200)
    })
})