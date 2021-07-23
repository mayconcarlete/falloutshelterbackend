import mongoose, { Mongoose } from 'mongoose'

export class MongoDB {
  private mongooseConnection: undefined|Mongoose

  async connect (): Promise<Mongoose> {
    const uri = `${process.env.MONGO_URL}`
    this.mongooseConnection = await mongoose.connect(uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
   
    return this.mongooseConnection
  }

  async disconnect (): Promise<void> {
    await this.mongooseConnection?.disconnect()
  }

  static mapObject (object: any): any {
    const _doc = object._doc
    const { _id, __v,...rest } = _doc
    return { ...rest, id: _id }
  }
}
