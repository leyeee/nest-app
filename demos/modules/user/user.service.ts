import {
    HttpException,
    Inject,
    Injectable,
    OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CryptoUtil } from '../../common/utils/crypto.util';

@Injectable()
export class UserService implements OnModuleInit {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
    ) {}

    async onModuleInit() {
        if (await this.findOneByAccount('admin')) {
            return;
        }

        const admin = this.userRepo.create({
            account: 'admin',
            password: this.cryptoUtil.encryptPassword('i_am_admin_!'),
            name: '系统管理员',
            role: 'admin',
        });
        await this.userRepo.save(admin);
    }

    async findOneByAccount(account: string): Promise<User> {
        return await this.userRepo.findOne({ account });
    }

    async login(account: string, password: string): Promise<void> {
        const user = await this.findOneByAccount(account);
        if (!user) {
            throw new HttpException('登录账号有误', 406);
        }
        if (!this.cryptoUtil.checkPassword(password, user.password)) {
            throw new HttpException('登录密码有误', 406);
        }
    }

    async register(user: User): Promise<void> {
        const existing = await this.findOneByAccount(user.account);
        if (existing) {
            throw new HttpException('账号已存在', 409);
        }
        user.password = this.cryptoUtil.encryptPassword(user.password);
        await this.userRepo.save(this.userRepo.create(user));
    }

    async remove(id: number): Promise<void> {
        const existing = await this.userRepo.findOne(id);
        if (!existing) {
            throw new HttpException('Id 为 ${id} 的用户不存在', 404);
        }
        await this.userRepo.remove(existing);
    }

    async update(id: number, updateInput: User) {
        const existing = await this.userRepo.findOne(id);
        if (!existing) {
            throw new HttpException('Id 为 ${id} 的用户不存在', 404);
        }
        if (updateInput.account) {
            existing.account = updateInput.account;
        }
        if (updateInput.password) {
            existing.password = this.cryptoUtil.encryptPassword(
                updateInput.password,
            );
        }
        if (updateInput.name) {
            existing.name = updateInput.name;
        }
        await this.userRepo.save(existing);
    }

    async findOneWithPostsById(id: number): Promise<User> {
        return await this.userRepo.findOne(id, { relations: ['posts'] });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepo.find();
    }
}
