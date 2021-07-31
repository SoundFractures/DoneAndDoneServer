import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface UserDocument extends mongoose.Document {
  email: string
  username: string
  password: string
  createdAt: string
  updatedAt: string
  comparePassword(password: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
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
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  let user = this as UserDocument

  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt()

  user.password = await bcrypt.hashSync(user.password, salt)

  return next()
})

UserSchema.methods.comparePassword = function (password: string) {
  return new Promise((resolve, reject) => {
    const user = this as UserDocument
    bcrypt.compare(password, user.password).then((equal) => {
      equal ? resolve(equal) : reject(equal)
    })
  })
}

const User = mongoose.model<UserDocument>('User', UserSchema)
export default User
