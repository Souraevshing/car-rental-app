import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController

  //here, in-order to test the UsersService, we create mock or dummy users and run all the tests over it. In this case, we are testing create() & find() methods.
  //Same for AuthService

  //Partial means we will not write each function of UsersService & AuthService
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'demo@demo.com',
          password: 'test123',
        } as User)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'test123' } as User]) //setting type as User since User.entity has many other properties that needs to be defined here i.e. password.
      },
      // remove:(id:number)=>{},
      // update:()=>{}
    }

    fakeAuthService = {
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User)
      },
      // signUp:()=>{}
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],

      //DEPENDENCY INJECTION.
      //whenever someone asks for UsersService, give them fakeUsersService & for AuthService give them fakeAuthService
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  // it('throws error if given id is not found', async () => {
  //   fakeUsersService.findOne = () => null
  //   await expect(controller.findUser('1')).rejects.toThrow(NotFoundException)
  // })

  it('finds list of all users based on email', async () => {
    const users = await controller.findAllUsers('demo@demo.com')
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('demo@demo.com')
  })

  it('find user returns single user with given id', async () => {
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  })

  it('sign in and update session object and return user', async () => {
    const session = { userId: -10 }
    const user = await controller.signIn(
      { email: 'demo@demo.com', password: 'test123' },
      session
    )

    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  })
})
