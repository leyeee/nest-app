import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class CryptoUtil {

    /**
     * 加密登录密码
     * @param password
     */
    encryptPassword(password: string): string {
        return createHash('sha256').update(password).digest('hex');
    }

    /**
     * 检查登录密码是否正确
     * @param password
     * @param encryptedPassword
     */
    checkPassword(password: string, encryptedPassword): boolean {
        const currentPass = this.encryptPassword(password);
        return currentPass === encryptedPassword;
    }
}
