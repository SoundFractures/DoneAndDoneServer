import User, { UserDocument } from '../model/user.model'
import UserRepository from '../repository/user.repository'
import { Error } from '../utils/types'
export default class UserService {
  private _userRepository: UserRepository

  constructor() {
    this._userRepository = new UserRepository()
  }

  async listUsers() {
    return new Promise((resolve) => {
      this._userRepository.list().then((data) => {
        resolve(data)
      })
    })
  }

  async findUser(_id: string) {
    return new Promise((resolve, reject) => {
      this._userRepository
        .find(_id)
        .then((data) => resolve(data))
        .catch((error) => reject(new Error(error.message, 404)))
    })
  }

  async updateUser(_id, item: UserDocument) {
    return new Promise((resolve, reject) => {
      this._userRepository
        .update(_id, item)
        .then((data) => resolve(data))
        .catch((error) => {
          if (error.code === 11000)
            reject(new Error('Email already in use', 400))
          reject(new Error(error.message, 404))
        })
    })
  }

  async deleteUser(_id) {
    return new Promise((resolve, reject) => {
      this._userRepository
        .delete(_id)
        .then((data) => resolve(data))
        .catch((error) => reject(new Error(error.message, 404)))
    })
  }
}
