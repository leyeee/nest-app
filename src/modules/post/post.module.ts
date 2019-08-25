import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.entity';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        TypeOrmModule.forFeature([Post]),
    ],
    providers: [PostService],
    controllers: [PostController],
})
export class PostModule {}
