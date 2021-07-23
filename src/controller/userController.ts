import express from 'express'
import UserService from '../service/userService'

const router = express.Router()
const userService = new UserService()
router
  .route('/')
  .get((request: express.Request, res: express.Response): void => {
    userService.index((error, result) => {
      if (error) res.status(400).json(error)
      res.send(result)
    })
  })

router
  .route('/')
  .post((request: express.Request, res: express.Response): void => {
    userService.create(request.body, (error, result) => {
      if (error) res.status(400).json(error)
      res.send(result)
    })
  })

router
  .route('/:id')
  .get((request: express.Request, res: express.Response): void => {
    userService.find(request.params.id, (error, result) => {
      if (error) res.status(400).json(error)
      res.send(result)
    })
  })

export default router
