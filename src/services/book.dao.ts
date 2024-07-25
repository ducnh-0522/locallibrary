import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';

export class BookDAO {
    private bookRepository = AppDataSource.getRepository(Book);

    async getCount() {
        return await this.bookRepository.count();
    }

}