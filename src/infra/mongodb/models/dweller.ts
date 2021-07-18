import mongoose, { Schema, Document } from 'mongoose'

export interface DwellerInterface extends Document {
  name: string
  age: string
  hairColor: string
  eyeColor: string
}

const VaultSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  hairColor: { type: String, required: true },
  eyeColor: { type: String, required: true }
})

const DwellerRepositoryModel = mongoose.model<DwellerInterface>('Vault', VaultSchema)

export default DwellerRepositoryModel
