import { SetMetadata } from '@nestjs/common';

// 自定义 Roles 装饰器，配合 Guard 使用
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
