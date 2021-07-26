import express from 'express'
import UserService from '../service/UserService'
import authMiddleware from '../middleware/AuthMiddleware'
const router = express.Router()

const userService = new UserService()
router
  .route('/verify')
  .get(authMiddleware, (req: any, res: express.Response): void => {
    userService.verify(req.user._id, (error, result) => {
      if (error) res.status(404).json(error)
      res.send(result)
    })
  })

router.route('/login').post((req: any, res: express.Response): void => {
  userService.login(req.body, (error, result) => {
    if (error) res.status(error.status).json({ error: error.message })
    res.send(result)
  })
})

router.route('/register').post((req: any, res: express.Response): void => {
  userService.register(req.body, (error, result) => {
    if (error) res.status(error.status).json({ error: error.message })
    res.send(result)
  })
})

export default router
