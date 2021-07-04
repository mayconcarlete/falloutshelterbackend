import { Vault } from "../../../../../src/domain/models/vault";
import { GetVaultById } from "../../../../../src/domain/usecases/get-vault-by-id";

export class MockGetVaultById implements GetVaultById{
    async getById(id: string): Promise<Vault> {
        return new Promise((resolve, reject)=>{
            resolve({
                id: 'valid_id',
                name: 'MAYCON',
                age: '2020-6-02',
                eyeColor: 'BROWN',
                hairColor: 'BROWN',
            })
        })
    }
}