import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    name: string;

    @Column({
        default: 'regular',
    })
    role: string;

    @CreateDateColumn({ name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ name: 'update_at', nullable: true })
    updateAt: Date;
}
