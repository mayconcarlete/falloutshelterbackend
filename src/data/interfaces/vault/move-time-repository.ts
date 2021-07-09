export interface MoveTimeRepository {
    move(date:string):Promise<string>
}