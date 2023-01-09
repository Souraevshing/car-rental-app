import { UsersService } from "./users.service";
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    signUp(email: string, password: string): Promise<import("./user.entity").User>;
    signIn(email: string, password: string): Promise<import("./user.entity").User>;
}
