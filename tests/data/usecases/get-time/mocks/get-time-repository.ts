import { GetTimeRepository } from "../../../../../src/data/interfaces/time/get-time";
import { TimeFoward } from "../../../../../src/domain/models/time";

export class MockGetTimeRepository implements GetTimeRepository{
    async get(): Promise<TimeFoward> {
        return new Promise((resolve, reject) => {
            resolve({
                id: 'valid_id',
                time: '2021-01-01'
            })
        })
    }
}