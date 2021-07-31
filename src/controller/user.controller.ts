import express from 'express'
import UserService from '../service/user.service'
import authMiddleware from '../middleware/AuthMiddleware'
import { IError } from '../utils/types'
import { makeJSON } from '../utils/controller.functions'
const router = express.Router()

//Middleware
// router.use((req, res, next) => authMiddleware(req, res, next))

const _userService = new UserService()
router.route('/').get((req: express.Request, res: express.Response) => {
  _userService.listUsers().then((data) => res.json(data))
})

router.route('/:id').get((req: express.Request, res: express.Response) => {
  _userService
    .findUser(req.params.id)
    .then((data) => res.json(data))
    .catch((error: IError) =>
      res.status(error.status).json(makeJSON(error.message))
    )
})

router.route('/:id').patch((req: express.Request, res: express.Response) => {
  _userService
    .updateUser(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((error) => res.status(error.status).json(makeJSON(error.message)))
})

router.route('/:id').delete((req: express.Request, res: express.Response) => {
  _userService
    .deleteUser(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.status(error.status).json(makeJSON(error.message)))
})

export default router
