import mongoose, { Schema, Document } from 'mongoose'

export interface DwellerInterface extends Document {
  name: string
  age: string
  hairColor: string
  eyeColor: string
}

const DwellerSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  hairColor: { type: String, required: true },
  eyeColor: { type: String, required: true }
})

const DwellerRepositoryModel = mongoose.model<DwellerInterface>('Dweller', DwellerSchema)

export default DwellerRepositoryModel
