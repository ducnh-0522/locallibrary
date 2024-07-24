import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Author } from './author.entity';
import { Genre } from './genre.entity';
import { BookInstance } from './bookInstance.entity';

@Entity()
export class Book {
    constructor(obj?: Partial<Book>) {
        if (obj) {
            Object.assign(this, obj);
        }
    }
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    summary: string;

    @Column({ nullable: true })
    isbn: string;

    @ManyToOne(() => Author, author => author.books)
    author: Author;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    @OneToMany(() => BookInstance, (instance: BookInstance) => instance.book)
    instances: BookInstance[];
}
