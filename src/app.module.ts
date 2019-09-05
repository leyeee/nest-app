import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ErrorsInterceptor } from './interceptors/errors';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
// import { RolesGuard } from './guards/roles';
import { MockModule } from './mock/mock.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(), // 建立 typeorm 与数据库的联系
        UserModule,
        AuthModule,
        MockModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR, // 全局拦截器，这里使用全局异常拦截器修改异常消息结构
            useClass: ErrorsInterceptor,
        },
        // {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard,
        // },
    ],
})
export class AppModule {}
