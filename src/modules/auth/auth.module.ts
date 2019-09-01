import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        // UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstant.secret,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        forwardRef(() => UserModule),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
