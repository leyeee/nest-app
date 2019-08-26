import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class CryptoUitl {
    /**
     * 加密登录密码
     * @param password
     */
    encryptPassword(password: string): string {
        return createHash('sha256')
            .update(password)
            .digest('hex');
    }

    /**
     * 检查登录密码是否正确
     * @param password
     * @param encryptedPassword
     */
    checkPassword(password: string, encryptedPassword: string): boolean {
        const currentPass = this.encryptPassword(password);
        return currentPass === encryptedPassword;
    }
}
