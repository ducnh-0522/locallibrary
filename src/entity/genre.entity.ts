import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Genre {
    constructor(obj?: Partial<Genre>) {
        if (obj) {
            Object.assign(this, obj);
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Book, (book) => book.genres)
    books: Book[];
}
