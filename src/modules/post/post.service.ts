import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    ) {}

    async findOneById(id: number): Promise<Post> {
        return await this.postRepo.findOne(id);
    }

    async findAll(userId: number): Promise<Post[]> {
        return await this.postRepo.find({ where: { user: { id: userId } } });
    }

    async create(createInput: Post): Promise<void> {
        await this.postRepo.save(createInput);
    }

    async remove(id: number): Promise<void> {
        const existing = await this.findOneById(id);
        if (!existing) {
            throw new HttpException('删除失败，Id 为 ${id} 的帖子不存在', 404);
        }
        await this.postRepo.remove(existing);
    }

    async update(id: number, updateInput: Post): Promise<void> {
        const existing = await this.findOneById(id);
        if (!existing) {
            throw new HttpException('更新失败，Id 为 ${id} 的帖子不存在', 404);
        }
        if (updateInput.title) {
            existing.title = updateInput.title;
        }
        if (updateInput.content) {
            existing.content = updateInput.content;
        }
        await this.postRepo.save(existing);
    }
}
