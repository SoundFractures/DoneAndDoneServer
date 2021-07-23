import Repository from './base/Repository'
import IUserModel from '../model/interfaces/IUserModel'
import UserSchema from '../model/schemas/UserSchema'

class UserRepository extends Repository<IUserModel> {
  constructor() {
    super(UserSchema)
  }

  findWithPassword(
    _id: string,
    callback: (error: any, result: IUserModel | null) => void
  ) {
    UserSchema.findById(_id)
      .select('+password')
      .exec((error, data) => callback(error, data))
  }
}

Object.seal(UserRepository)
export = UserRepository
