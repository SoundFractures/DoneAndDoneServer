import mongoose from 'mongoose'
import IUserModel from '../interfaces/IUserModel'
const Schema = mongoose.Schema

const User = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

export default mongoose.model<IUserModel>('User', User)
