export class ServerError extends Error {
    constructor(){
        super()
        this.name = 'ServerError'
        this.message = 'Something wrong with server'
    }
}