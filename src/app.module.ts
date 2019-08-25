import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './core/interceptors/errors.interceptor';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(), // 建立 typeorm 与数据库的联系
        UserModule,
        PostModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR, // 全局拦截器，这里使用全局异常拦截器修改异常消息结构
            useClass: ErrorsInterceptor,
        },
    ],
})
export class AppModule {}
