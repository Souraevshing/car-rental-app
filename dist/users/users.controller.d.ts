import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(body: CreateUserDto): void;
    findUser(id: string): Promise<import("./user.entity").User>;
    findAllUsers(email: string): Promise<import("./user.entity").User[]>;
    removeUser(id: string): Promise<import("typeorm").DeleteResult>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./user.entity").User>;
}
