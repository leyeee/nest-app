import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ManyToOne } from 'typeorm/browser';
import { User } from '../user/user.entity';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        type: 'text',
    })
    content: string;

    @ManyToOne(type => User, user => user.posts, {
        onDelete: 'CASCADE',
    })
    user: User;
}
