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
} from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { Serialize } from '../interceptors/serialize-interceptor'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorator/current-user.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user-dto'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get('/whoAmI')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user
  }

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

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id))
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
