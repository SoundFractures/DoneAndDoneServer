import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authMiddleware = (req: any, res: any, next: any) => {
  const header = req.headers['authorization']
  const token = header && header.split(' ')[1]

  if (!token)
    return res.status(401).json({
      message: 'Token not found.'
    })

  jsonwebtoken.verify(token, process.env.JWT!, (error: any, user: any) => {
    if (error)
      return res.status(403).json({
        message: 'Token invalid'
      })
    req.user = user
    next()
  })
}

export default authMiddleware
