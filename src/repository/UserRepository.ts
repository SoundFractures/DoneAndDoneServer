import Repository from './base/Repository'
import IUserModel from '../model/interfaces/IUserModel'
import UserModel from '../model/UserModel'
import IErrorModel from '../model/interfaces/IErrorModel'
class UserRepository extends Repository<IUserModel> {
  constructor() {
    super(UserModel)
  }

  findCompleteUser(
    _id: string,
    callback: (error: IErrorModel | null, result: any) => void
  ) {
    UserModel.findById(_id)
      .select('+password')
      .exec((error, data) => {
        if (!data) callback({ message: 'User not found', status: 404 }, null)
        callback(null, data)
      })
  }

  findByEmail(email: string, callback: (error: any, result: any) => void) {
    UserModel.findOne({ email: email })
      .select('+password')
      .exec((error, data) => {
        if (!data) callback({ message: 'User not found', status: 404 }, data)
        callback(null, data)
      })
  }
}

Object.seal(UserRepository)
export = UserRepository
