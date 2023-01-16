import { CanActivate, ExecutionContext } from '@nestjs/common'

/** canActivate() will return true if user is allowed to signin else false */
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()
    return req.session.userId
  }
}
