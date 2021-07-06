import { Vault } from "../../../../../src/domain/models/vault";
import { QueryVault } from "../../../../../src/domain/usecases/query-vault";

export class MockQueryVault implements QueryVault {
    async query(vaultParams: Vault): Promise<Vault[]> {
        return new Promise((resolve, reject) => {
            resolve([{
                id: 'valid_id',
                age: '2020-06-16',
                eyeColor: 'GREEN',
                hairColor: 'BROWN',
                name: 'VALID_NAME'
            }])
        })
    }
}