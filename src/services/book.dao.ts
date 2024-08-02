import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';
import { Author } from '../entity/author.entity';
import { Genre } from '../entity/genre.entity';

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

    async createBook(
        title: string,
        author: Author,
        summary: string,
        isbn?: string,
        genres?: Genre[]
    ): Promise<Book> {
        const book = new Book();
        book.title = title;
        book.author = author;
        book.summary = summary;
        if (isbn) book.isbn = isbn;
        if (genres) book.genres = genres;
        return await this.bookRepository.save(book);
    }

    async updateBook(
        book: Book,
        title: string,
        author: Author,
        summary: string,
        isbn?: string,
        genres?: Genre[]
    ): Promise<Book> {
        book.title = title;
        book.author = author;
        book.summary = summary;
        if (isbn) book.isbn = isbn;
        if (genres) book.genres = genres;
        return await this.bookRepository.save(book);
    }

    async deleteBook(id: number) {
        return await this.bookRepository.delete(id);
    }
}
