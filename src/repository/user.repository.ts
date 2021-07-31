import Repository from '../repository'
import User, { UserDocument } from '../model/user.model'

class UserRepository extends Repository<UserDocument> {
  constructor() {
    super(User)
  }

  async findByEmail(email: string) {
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .select('+password')
        .then((data) => {
          data ? resolve(data) : reject({ message: `User does not exist` })
        })
    })
  }
}

Object.seal(UserRepository)
export = UserRepository
