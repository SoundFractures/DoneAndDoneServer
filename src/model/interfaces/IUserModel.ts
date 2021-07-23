import mongoose = require('mongoose')

interface IUserModel extends mongoose.Document {
  email: string
  username: string
  password: string
}

export = IUserModel
