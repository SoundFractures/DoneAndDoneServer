import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './usermodel.'

export interface ITodo extends Document {
  title: string
  completed?: boolean
  user: IUser['_id']
}

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

export default mongoose.model('Todo', TodoSchema)
