import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Query,
  Session,
  UseGuards,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import {
  Serialize,
  SerializeInterceptor,
} from '../interceptors/serialize-interceptor'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorator/current-user.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user-dto'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Controller('auth')
/* at controller level to implement serialization to all routers */
@Serialize(UserDto)
/** config UseInterceptors to first call CurrentUserInterceptor decorator and fetch userId from session object */
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  /** after calling CurrentUserInterceptor and getting userId, then call CurrentUser decorator to get current userId from request */
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user
  }

  /** @Get('/whoami')
   whoAmI(@Session() session: any) {
     return this.usersService.findOne(session.userId)
   } */

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password)
    session.userId = user.id
    return user
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password)
    session.userId = user.id
    return user
  }

  //@UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email)
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body)
  }
}
