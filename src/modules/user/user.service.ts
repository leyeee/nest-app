import {
    Injectable,
    OnModuleInit,
    HttpException,
    Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CryptoUitl } from 'src/utils/crypto';

@Injectable()
export class UserService implements OnModuleInit {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @Inject(CryptoUitl) private readonly cryptoUtil: CryptoUitl,
    ) {}

    async onModuleInit() {
        if (await this.findOneByEmail('502533466@qq.com')) {
            return;
        }
        const superadmin = this.userRepo.create({
            email: '502533466@qq.com',
            name: '超级管理员',
            role: 'superadmin',
            password: this.cryptoUtil.encryptPassword('12345678'),
        });
        await this.userRepo.save(superadmin);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepo.findOne({ email });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepo.find();
    }

    async login(email: string, password: string): Promise<void> {
        const user = await this.findOneByEmail(email);
        if (!user) {
            throw new HttpException('账号或者密码错误', 406);
        }
        if (!this.cryptoUtil.checkPassword(password, user.password)) {
            throw new HttpException('账号或者密码错误', 406);
        }
    }

    async register(user: User): Promise<void> {
        const existed = await this.findOneByEmail(user.email);
        if (existed) {
            throw new HttpException('账号已存在', 409);
        }
        const data = {
            ...user,
            password: this.cryptoUtil.encryptPassword(user.password),
        };
        await this.userRepo.save(this.userRepo.create(data));
    }
}
