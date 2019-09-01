import { Injectable, Inject } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(JwtService) private readonly jwtService: JwtService,
    ) {}

    async validateUser(payload: { userId: string }): Promise<User> {
        const user = await this.userService.findOneById(payload.userId);
        user.password = null;
        return user;
    }

    async createToken(userId: string) {
        const payload = { userId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
