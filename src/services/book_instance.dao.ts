import { AppDataSource } from '../config/data-source';
import { BookInstance } from '../entity/bookInstance.entity';
import { BookInstanceStatus } from '../enums/book_instance_status';
import { Book } from '../entity/book.entity';

export class BookInstanceDAO {
    private bookInstanceRepository = AppDataSource.getRepository(BookInstance);

    async getCount() {
        return await this.bookInstanceRepository.count();
    }

    async getAvailableCount() {
        return await this.bookInstanceRepository.count({
            where: { status: BookInstanceStatus.Available }
        });
    }

    async getBookInstances() {
        return await this.bookInstanceRepository.find({
            relations: ['book'],
            order: {
              book: { title: 'ASC' },
            },
        });
    }

    async getBookInstanceById(id: number) {
        return await this.bookInstanceRepository.findOne({
            where: { id },
            relations: ['book'],
        });
    }

    async createBookInstance(
        book: Book,
        imprint: string,
        status: BookInstanceStatus,
        dueBack?: Date
    ): Promise<BookInstance> {
        const bookInstance = new BookInstance();
        bookInstance.book = book;
        bookInstance.imprint = imprint;
        bookInstance.status = status;
        if (dueBack) bookInstance.dueBack = dueBack;
        return await this.bookInstanceRepository.save(bookInstance);
    }

    async updateBookInstance(
        bookInstance: BookInstance,
        book: Book,
        imprint: string,
        status: BookInstanceStatus,
        dueBack?: Date
    ): Promise<BookInstance> {
        bookInstance.book = book;
        bookInstance.imprint = imprint;
        bookInstance.status = status;
        if (dueBack) bookInstance.dueBack = dueBack;
        return await this.bookInstanceRepository.save(bookInstance);
    }

    async deleteBookInstance(id: number) {
        return await this.bookInstanceRepository.delete(id);
    }
}
