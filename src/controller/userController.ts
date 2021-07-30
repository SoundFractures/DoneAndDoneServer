import express from 'express'
import UserService from '../service/UserService'
import authMiddleware from '../middleware/AuthMiddleware'
const router = express.Router()

//Middleware
// router.use((req, res, next) => authMiddleware(req, res, next))

const userService = new UserService()
router.route('/').get((req: express.Request, res: express.Response): void => {
  userService.index((error, result) => {
    if (error) res.status(400).json(error)
    res.send(result)
  })
})

router
  .route('/:id')
  .get((req: express.Request, res: express.Response): void => {
    userService.find(req.params.id, (error, result) => {
      if (error) res.status(error.status).json({ error: error.message })
      res.send(result)
    })
  })

router
  .route('/:id')
  .patch(
    authMiddleware,
    (req: express.Request, res: express.Response): void => {
      userService.update(req.params.id, req.body, (error, result) => {
        if (error) res.json(error)
        res.json(result)
      })
    }
  )

router
  .route('/:id')
  .delete(
    authMiddleware,
    (req: express.Request, res: express.Response): void => {
      userService.delete(req.params.id, (error, result) => {
        if (error) res.status(404).json(error)
        res.status(200).json(result)
      })
    }
  )

export default router
