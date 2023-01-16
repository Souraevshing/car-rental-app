import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/** creating custom decorator to fetch current user based on request.
 * createParamDecorator defines the rules for routes.
 *
 * context is like a wrapper around incoming request.
 *
 * the req object will receve the incoming http request by converting it to http request
 */
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest()
    //console.log(req.session.userId) getting userId from session
    return req.currentUser //returning currentUser
  }
)
