import mongoose, { Mongoose } from "mongoose"

export class MongoDB {
    
    private mongooseConnection:undefined|Mongoose

    async connect (): Promise<Mongoose> {
        this.mongooseConnection = await mongoose.connect('mongodb://0.0.0.0:27017/teste',{
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        return this.mongooseConnection
    }
    static mapObject (object: any): any {
        const _doc = object._doc
        const { _id, __v,...rest } = _doc
        return { ...rest, id: _id }
    }
}