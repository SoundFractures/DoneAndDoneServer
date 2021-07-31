import express from 'express'
import AuthService from '../service/auth.service'
import UserService from '../service/user.service'
import authMiddleware from '../middleware/auth.middleware'
import { makeJSON } from '../utils/controller.functions'

const router = express.Router()
const _authService = new AuthService()
const _userService = new UserService()

router
  .route('/user')
  .get(authMiddleware, (req: express.Request | any, res: express.Response) => {
    _userService.findUser(req.user._id).then((data) => {
      res.json({ user: data })
    })
  })

router.route('/login').post((req: express.Request, res: express.Response) => {
  _authService
    .login(req.body)
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(error.status).json(makeJSON(error.message))
    })
})

router
  .route('/logout')
  .post(authMiddleware, (req: express.Request, res: express.Response) => {})

router
  .route('/register')
  .post((req: express.Request, res: express.Response) => {
    _authService
      .register(req.body)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(error.status).json(makeJSON(error.message)))
  })

export default router
