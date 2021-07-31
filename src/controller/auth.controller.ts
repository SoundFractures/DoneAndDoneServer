import express from 'express'
import UserService from '../service/user.service'
import authMiddleware from '../middleware/AuthMiddleware'
import { makeJSON } from '../utils/controller.functions'
const router = express.Router()

const _userService = new UserService()
router
  .route('/user')
  .get(authMiddleware, (req: express.Request, res: express.Response) => {})

router.route('/login').post((req: express.Request, res: express.Response) => {})

router
  .route('/logout')
  .post(authMiddleware, (req: express.Request, res: express.Response) => {})

router
  .route('/register')
  .post((req: express.Request, res: express.Response) => {
    _userService
      .createUser(req.body)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(error.status).json(makeJSON(error.message)))
  })

export default router
