import express from 'express'
import UserService from '../service/UserService'
import authMiddleware from '../middleware/AuthMiddleware'
const router = express.Router()

const userService = new UserService()
router
  .route('/user')
  .get(authMiddleware, (req: any, res: express.Response): void => {
    userService.user(req.user.email, req.token, (error, result) => {
      if (error) res.status(error.status).json({ error: error.message })
      else res.status(200).json(result)
    })
  })

router.route('/login').post((req: any, res: express.Response): void => {
  userService.login(req.body, (error, result) => {
    if (error) {
      console.log(error)
      res.status(error.status).json({ error: error.message })
    } else {
      res.status(200).json(result)
    }
  })
})

router
  .route('/logout')
  .post(authMiddleware, (req: any, res: express.Response): void => {
    userService.logout(req.token, (error, result) => {
      //if (error) res.status(error.status).json({ error: error.message })
      res.status(200).json({ message: result })
    })
  })

router.route('/register').post((req: any, res: express.Response): void => {
  userService.register(req.body, (error, result) => {
    if (error) res.status(error.status).json({ error: error.message })
    else res.status(200).json(result)
  })
})

export default router
