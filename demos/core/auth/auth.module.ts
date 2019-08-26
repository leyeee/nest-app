import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './auth.service';
import { AuthStrategy } from './jwt.strategy';

@Module({
    imports: [
        // 向 nest 容器注入 jwt 模块， 并配置密钥和令牌有效期
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        forwardRef(() => UserModule), // 处理模块间的循环依赖
    ],
    providers: [AuthService, AuthStrategy],
    exports: [AuthService], // 导出 AuthService 供 UserModule 使用
})
export class AuthModule {}
