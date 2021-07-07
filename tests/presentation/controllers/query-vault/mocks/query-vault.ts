import { Vault } from "../../../../../src/domain/models/vault";
import { QueryVault } from "../../../../../src/domain/usecases/query-vault";

export class MockQueryVault implements QueryVault {
    async query(vaultParams: Vault): Promise<Vault[]> {
        return new Promise((resolve, reject) => {
            resolve([{
                id: 'valid_id',
                age: 'valid_age',
                eyeColor: 'valid_eye_color',
                hairColor: 'valid_hair_color',
                name: 'VALID_NAME'
            }])
        })
    }
}