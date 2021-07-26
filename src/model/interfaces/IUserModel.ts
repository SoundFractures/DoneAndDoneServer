import mongoose from 'mongoose'

interface IUserModel extends mongoose.Document {
  email: string
  username: string
  password: string
  token?: string
}

export = IUserModel
