import User, { UserDocument } from '../model/user.model'
import UserRepository from '../repository/user.repository'
import jsonwebtoken from 'jsonwebtoken'
import { Error } from '../utils/types'
import dotenv from 'dotenv'
dotenv.config()
export default class AuthService {
  private _userRepository: UserRepository

  constructor() {
    this._userRepository = new UserRepository()
  }

  async authUser(_id, token) {
    return await this._userRepository.find(_id).then((data) => {
      return {
        user: data,
        token
      }
    })
  }

  async login({ email, password }: { email: string; password: string }) {
    return new Promise((resolve, reject) => {
      if (!email || !password)
        reject(new Error('Credentials not provided', 400))
      this._userRepository
        .findByEmail(email)
        .then(async (data) => {
          const user = new User(data)
          await user
            .comparePassword(password)
            .then(() => {
              jsonwebtoken.sign(
                {
                  _id: user._id,
                  username: user.username,
                  email: user.email
                },
                process.env.JWT!,
                (error, token) => {
                  if (error) throw error
                  resolve(this.authUser(user._id, token))
                }
              )
            })
            .catch(() => reject(new Error('Incorrect password', 400)))
        })
        .catch((error) => reject(new Error(error.message, 404)))
    })
  }

  async register(item: UserDocument) {
    return new Promise((resolve, reject) => {
      this._userRepository
        .create(item)
        .then((data) => resolve(data))
        .catch((error) => {
          if (error.code === 11000)
            reject(new Error('Email already in use', 400))
          reject(new Error(error.message, 400))
        })
    })
  }
}
