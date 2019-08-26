import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
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
