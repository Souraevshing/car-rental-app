import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    //if user found, throw error
    const user = await this.usersService.find(email)
    if (user.length) {
      throw new BadRequestException('Email already in use')
    }
    //generate salt
    const salt = randomBytes(8).toString('hex')
    //hash password
    const hash = (await scrypt(password, salt, 32)) as Buffer
    //store hashed password
    const result = `${salt}.${hash.toString('hex')}`
    //create new user with hash password
    const users = await this.usersService.create(email, result)
    return users
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const [salt, hashedPassword] = user.password.split('.')
    const hash = (await scrypt(password, salt, 32)) as Buffer
    if (hashedPassword === hash.toString('hex')) {
      return user
    } else {
      throw new BadRequestException('Wrong credentials')
    }
  }
}
