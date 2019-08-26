import {
    CallHandler,
    Injectable,
    NestInterceptor,
    ExecutionContext,
    HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(
                (error, caught): any => {
                    if (error instanceof HttpException) {
                        return Promise.resolve({
                            code: error.getStatus(),
                            message: error.getResponse(),
                        });
                    }
                    return Promise.resolve({
                        error: 1,
                        code: 500,
                        message: `服务器出现了意外错误: ${error.toString()}`,
                    });
                },
            ),
        );
    }
}
