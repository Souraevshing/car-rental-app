/**
 * Adding CurrentUserMiddleware to fetch current user before sending request instead of getting current user from interceptor
 */

import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { User } from '../user.entity'

import { UsersService } from '../users.service'

declare global {
  namespace Express {
    interface Request {
      currentUser?: User
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //getting userId from cookie session
    const { userId } = req.session || {}
    if (userId) {
      const user = await this.usersService.findOne(userId)
      //assigning user to currentUser
      req.currentUser = user
      console.log(res)
    }

    next()
  }
}
