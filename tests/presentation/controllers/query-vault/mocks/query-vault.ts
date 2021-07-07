import { Vault } from "../../../../../src/domain/models/vault";
import { QueryVault } from "../../../../../src/domain/usecases/query-vault";

export class MockQueryVault implements QueryVault {
    async query(vaultParams: Vault): Promise<Vault[]> {
        return new Promise((resolve, reject) => {
            resolve([{
                id: 'valid_id',
                age: 'VALID_AGE',
                eyeColor: 'VALID_EYE_COLOR',
                hairColor: 'VALID_HAIR_COLOR',
                name: 'VALID_NAME'
            }])
        })
    }
}