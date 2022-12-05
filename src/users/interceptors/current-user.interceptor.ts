import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common'
import { UsersService } from '../users.service'

export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const req = context.switchToHttp().getRequest()
    const { userId } = req.session
    console.log(userId)
    //user found
    if (userId) {
      const user = await this.usersService.findOne(userId)
      req.currentUser = user
    }

    return handler.handle()
  }
}
