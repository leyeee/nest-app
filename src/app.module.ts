import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './core/interceptors/errors.interceptor';

@Module({
    imports: [TypeOrmModule.forRoot()],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR, // 全局拦截器，这里使用全局异常拦截器修改异常消息结构
            useClass: ErrorsInterceptor,
        },
    ],
})
export class AppModule {}
