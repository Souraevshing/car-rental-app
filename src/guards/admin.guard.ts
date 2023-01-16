import { CanActivate, ExecutionContext } from '@nestjs/common'

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()

    //if req does not contan currentUser return false
    if (!req.currentUser) {
      return false
    }
    //if currentUser is admin then return true or false otherwise
    if (req.currentUser.admin) {
      return true
    } else {
      return false
    }
  }
}
