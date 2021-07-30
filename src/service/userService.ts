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
    this._userRepository.find(_id, (error, result) => {
      if (error) callback({ message: 'User not found', status: 404 }, result)
      else callback(error, result)
    })
  }

  // Auth
  user(
    email: string,
    token: string,
    callback: (error: IErrorModel | null, result: any) => void
  ) {
    this._userRepository.findByEmail(email, (error, result) => {
      if (error) callback(error, null)
      callback(null, this.returnAuthUser(result, token))
    })
  }

  logout(
    token: string,
    callback: (error: IErrorModel | null, result: any) => void
  ) {
    console.log('[LOGOUT]: ' + token)
    callback(null, 'Logged out')
  }

  login(
    { email, password }: { email: string; password: string },
    callback: (error: IErrorModel | null, result: any) => void
  ) {
    if (!email || !password)
      return callback(
        { message: 'Email or Password not provided', status: 400 },
        null
      )
    let user: any = null
    this._userRepository.findByEmail(email, (findError, findResult) => {
      if (findError !== null) return callback(findError, null)
      else user = findResult
    })
    if (user) {
      bcrypt.compare(password, user!.password).then((equal: boolean) => {
        if (!equal)
          callback({ message: 'Wrong email or password', status: 400 }, null)
        jsonwebtoken.sign(
          {
            _id: user!._id,
            email: user!.email
          },
          process.env.JWT!,
          { expiresIn: 3600 },
          (error: any, token: any) => {
            if (error) throw error
            callback(null, { token })
          }
        )
      })
    }
  }

  register(
    body: IUserModel,
    callback: (error: IErrorModel | null, result: any) => void
  ) {
    if (!body.email || !body.username || !body.password)
      return callback(
        { message: 'Credentials not provided', status: 404 },
        null
      )

    this._userRepository.findByEmail(body.email, (error, result) => {
      if (result)
        return callback({ message: 'Email already in use', status: 400 }, null)
    })
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
            { expiresIn: 3600 },
            (error: any, token: any) => {
              if (error) throw error
              callback(null, { message: 'Registered successfully' })
            }
          )
        })
      })
    })
  }

  private returnAuthUser(result: any, token: string) {
    delete result._doc!.password
    return { user: result, token: token }
  }
}
Object.seal(UserService)
export = UserService
