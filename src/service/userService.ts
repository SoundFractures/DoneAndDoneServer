import UserRepository from '../repository/UserRepository'
import IUserModel from '../model/interfaces/IUserModel'
import IErrorModel from '../model/interfaces/IErrorModel'
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import UserModel from '../model/UserModel'
class UserService {
  private _userRepository: UserRepository

  constructor() {
    this._userRepository = new UserRepository()
  }

  index(callback: (error: any, result: any) => void) {
    this._userRepository.index(callback)
  }

  create(item: IUserModel, callback: (error: any, result: any) => void) {
    this._userRepository.create(item, callback)
  }

  update(
    _id: string,
    item: IUserModel,
    callback: (error: any, result: any) => void
  ) {
    this._userRepository.find(_id, (err, res) => {
      if (err) callback(err, res)
      else this._userRepository.update(res._id, item, callback)
    })
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._userRepository.delete(_id, callback)
  }

  find(_id: string, callback: (error: any, result: IUserModel) => void) {
    this._userRepository.find(_id, callback)
  }

  // Auth
  verify(
    _id: string,
    callback: (error: IErrorModel | null, result: any) => void
  ) {
    this._userRepository.findCompleteUser(_id, callback)
  }

  login(
    { email, password }: { email: string; password: string },
    callback: (error: IErrorModel | null, result: any) => void
  ) {
    if (!email || !password)
      callback({ message: 'Email or Password not provided', status: 400 }, null)

    this._userRepository.findByEmail(email, (error, result) => {
      if (error) callback({ message: 'User not found', status: 404 }, null)
      bcrypt.compare(password, result!.password).then((equal: boolean) => {
        if (!equal)
          callback({ message: 'Wrong email or password', status: 400 }, null)
        jsonwebtoken.sign(
          {
            _id: result!._id,
            email: result!.email
          },
          process.env.JWT!,
          (error: any, token: any) => {
            if (error) throw error
            result._doc.token = token
            callback(null, result)
          }
        )
      })
    })
  }

  register(
    body: IUserModel,
    callback: (error: IErrorModel | null, result: any) => void
  ) {
    if (!body.email || !body.username || !body.password)
      callback({ message: 'Credentials not provided', status: 404 }, null)
    const newUser = new UserModel(body)
    bcrypt.genSalt((error, salt) => {
      if (error) throw error
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        if (error) throw error
        newUser.password = hash
        this._userRepository.create(newUser, (error, result) => {
          if (error) callback({ message: error, status: 500 }, null)
          jsonwebtoken.sign(
            {
              _id: result!._id,
              email: result!.email
            },
            process.env.JWT!,
            (error: any, token: any) => {
              if (error) throw error
              result._doc.token = token
              callback(null, result)
            }
          )
        })
      })
    })
  }
}
Object.seal(UserService)
export = UserService
