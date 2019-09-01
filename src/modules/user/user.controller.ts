import { Controller, Body, Inject, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from './user.service';
import { Result } from 'src/interfaces/Result';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
        @Inject(UserService) private readonly userService: UserService,
    ) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }): Promise<
        Result
    > {
        const user = await this.userService.login(body.email, body.password);
        const accessToken = await this.authService.createToken(user.id);
        return {
            error: 0,
            code: 200,
            message: '登录成功',
            data: accessToken,
        };
    }

    @Post('register')
    async register(@Body() user: User): Promise<Result> {
        await this.userService.register(user);
        return {
            error: 0,
            code: 200,
            message: '注册成功',
        };
    }

    // @Roles('admin')
    // @UseGuards(AuthGuard(), RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(): Promise<Result> {
        const data = await this.userService.findAll();
        return {
            error: 0,
            code: 200,
            message: '查询所有用户成功',
            data,
        };
    }
}
