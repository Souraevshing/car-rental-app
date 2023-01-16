import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
const cookieSession = require('cookie-session')

/** in cookie session keys are small encrypted string or numbers that is sent as header along with request */
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    cookieSession({
      keys: ['test123'],
    })
  )
  /** enables whole app to use pipe for validation */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(8000)
}

bootstrap()
