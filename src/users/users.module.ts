import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { AuthService } from './auth.service'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { CurrentUserMiddleware } from './middlewares/current-user.middleware'

/** TypeOrmModule.forFeature([User]) is done so that all controllers & services will have to use User entity properties as specified
 *
 * configuring user.module to globally use CurrentUserInterceptor
 *
 * configure() function is used in order to run middleware i.e. CurrentUserMiddleware after cookie session and then to CurrentUserMiddleware and then to AdminGuard for all the routes
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
