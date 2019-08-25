import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        forwardRef(() => UserModule),
    ],
    providers: [],
    exports: [],
})
export class AuthModule {}
