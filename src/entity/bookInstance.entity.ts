import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class BookInstance {
    constructor(obj?: Partial<BookInstance>) {
        if (obj) {
            Object.assign(this, obj);
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imprint: string;

    @Column()
    status: string;

    @Column({ nullable: true })
    dueBack: Date;

    @ManyToOne(() => Book, book => book.instances)
    book: Book;
}
