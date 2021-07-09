import { MoveTimeRepository } from "../../../../../src/data/interfaces/vault/move-time-repository";

export class MockMoveTimeRepository implements MoveTimeRepository{
    move(date: string): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve('valid_date')
        })
    }
}