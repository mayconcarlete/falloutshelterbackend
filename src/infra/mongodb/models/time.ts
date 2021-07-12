import mongoose, {Schema, Document} from 'mongoose'

export interface TimeInterface extends Document {
    time: string
}

const timeSchema = new Schema({
    time: {type: String, required:true}
})

const TimeRepository = mongoose.model<TimeInterface>('Time', timeSchema)

export default TimeRepository