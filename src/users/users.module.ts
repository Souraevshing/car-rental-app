import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { AuthService } from './auth.service'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'

/** TypeOrmModule.forFeature([User]) is done so that all controllers & services will have to use User entity properties as specified
 *
 * configuring user.module to globally use CurrentUserInterceptor
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class UsersModule {}
