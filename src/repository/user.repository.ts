import Repository from '../repository'
import User, { UserDocument } from '../model/user.model'

class UserRepository extends Repository<UserDocument> {
  constructor() {
    super(User)
  }
}

Object.seal(UserRepository)
export = UserRepository
