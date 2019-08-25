import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(JwtService) private readonly jwtService: JwtService,
    );

    async createToken(payload: { account: string }): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async validateUser(payload: { account: string }): Promise<User> {
        return await this.userService.findOneByAccount(payload.account);
    }
}
