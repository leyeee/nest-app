import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CryptoUitl } from 'src/utils/crypto';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
    ],
    providers: [UserService, CryptoUitl],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
