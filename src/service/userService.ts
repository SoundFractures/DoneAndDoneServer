import UserRepository from '../repository/UserRepository'
import IUserModel from '../model/interfaces/IUserModel'
class UserService {
  private _userRepository: UserRepository

  constructor() {
    this._userRepository = new UserRepository()
  }

  create(item: IUserModel, callback: (error: any, result: any) => void) {
    this._userRepository.create(item, callback)
  }

  index(callback: (error: any, result: any) => void) {
    this._userRepository.index(callback)
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

  findWithPassword(_id: string, callback: (error: any, result: any) => void) {
    this._userRepository.findWithPassword(_id, callback)
  }
}
Object.seal(UserService)
export = UserService
