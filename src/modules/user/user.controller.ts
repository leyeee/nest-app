import {
    Body,
    Controller,
    Inject,
    Post,
    Delete,
    UseGuards,
    Param,
    Put,
    Get,
} from '@nestjs/common';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from './user.service';
import { Result } from '../../common/interfaces/result.interface';
import { User } from './user.entity';
import { Roles } from 'src/common/decotators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('user')
export class UserController {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
        @Inject(UserService) private readonly userService: UserService,
    ) {}

    @Post('login')
    async login(@Body() body: { account: string; password: string }): Promise<
        Result
    > {
        await this.userService.login(body.account, body.password);
        const accessToken = await this.authService.createToken({
            account: body.account,
        });
        return {
            code: 200,
            message: '登录成功',
            data: accessToken,
        };
    }

    @Post('register')
    async register(@Body() user: User): Promise<Result> {
        await this.userService.register(user);
        return {
            code: 200,
            message: '注册成功',
        };
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async remove(@Param() id: number): Promise<Result> {
        await this.userService.remove(id);
        return {
            code: 200,
            message: '删除用户成功',
        };
    }

    @Put(':id')
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async update(@Param() id: number, updateInput: User): Promise<Result> {
        await this.userService.update(id, updateInput);
        return {
            code: 200,
            message: '更新用户成功',
        };
    }

    @Get(':id')
    async findOne(@Param() id: number): Promise<Result> {
        const data = await this.userService.findOneWithPostsById(id);
        return {
            code: 200,
            message: '查询用户成功',
            data,
        };
    }

    @Get()
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async findAll(): Promise<Result> {
        const data = await this.userService.findAll();
        return {
            code: 200,
            message: '查询所有用户成功',
            data,
        };
    }
}
