import { ValidationPipe } from '@nestjs/common'
const cookieSession = require('cookie-session')

/**
creating setupApp so that on testing e2e all the cookie-session and validation-pipeline inside main.ts will be imported 
and test will run successfully
*/

export const setupApp = (app: any) => {
  app.use(cookieSession({ keys: ['test123'] }))

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
}
