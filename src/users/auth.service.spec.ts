import { Test } from '@nestjs/testing'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { UsersService } from './users.service'

//enclosing the test case inside describe so that test cases has it's own block scope.
//also now all the tests will have their own namespace
describe('AuthService', () => {
  //setting service type to AuthService
  let service: AuthService
  let fakeUsersService: Partial<UsersService>
  //before every test running this block of code will be executed
  beforeEach(async () => {
    const users: User[] = []
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email)
        return Promise.resolve(filteredUsers)
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User
        users.push(user)
        return Promise.resolve(user)
      },
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile()
    service = module.get(AuthService)
  })

  //defining the test case
  it('testing', async () => {
    expect(service).toBeDefined()
  })

  it('throws error if user signup with email in use', async () => {
    await service.signUp('demo@demo.com', 'test123')

    await expect(service.signUp('demo@demo.com', 'test123')).rejects.toThrow(
      BadRequestException
    )
  })

  it('throws error if user signin with unused email', async () => {
    await expect(service.signIn('demo@demo.com', 'test123')).rejects.toThrow(
      NotFoundException
    )
  })

  it('throws error if invalid password is entered', async () => {
    //here when we signup with password and login with different password, then test will pass else will fail
    await service.signUp('demo@demo.com', 'test12')

    await expect(service.signIn('demo@demo.com', 'test123')).rejects.toThrow(
      BadRequestException
    )
  })

  it('returns a user if valid password is entered', async () => {
    await service.signUp('demo@demo.com', 'test123')

    const user = await service.signIn('demo@demo.com', 'test123')
    expect(user).toBeDefined()
  })

  it('create new user with hashed password', async () => {
    const user = await service.signUp('demo@demo.com', 'test123')

    expect(user.password).not.toEqual('test123')
    const [salt, hash] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })
})
