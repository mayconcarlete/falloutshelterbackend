import mongoose, {Schema, Document} from 'mongoose'

export interface UserInterface extends Document {
    name: string
}

const UserSchema:Schema = new Schema({
    name: {type: String, required:true}
})

const User = mongoose.model<UserInterface>("user", UserSchema)

export default User