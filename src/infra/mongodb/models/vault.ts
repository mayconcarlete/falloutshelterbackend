import mongoose, { Schema, Document } from 'mongoose'

export interface VaultInterface extends Document {
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

const VaultRepositoryModel = mongoose.model<VaultInterface>('Vault', VaultSchema)

export default VaultRepositoryModel
