import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';

export class BookDAO {
    private bookRepository = AppDataSource.getRepository(Book);

    async getCount() {
        return await this.bookRepository.count();
    }

    async getBooks() {
        return await this.bookRepository.find({ 
            order: { title: 'ASC' }, 
            relations: ['author'] 
        });
    }

    async getBookById(id: number) {
        return await this.bookRepository.findOne({
            where: { id },
            relations: ['author' , 'genres' , 'instances']
        });
    }
}
