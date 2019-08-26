import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CommonModule } from '../../common/common.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/core/auth/auth.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
        CommonModule,
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
