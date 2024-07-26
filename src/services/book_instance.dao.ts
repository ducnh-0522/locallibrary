import { AppDataSource } from '../config/data-source';
import { BookInstance } from '../entity/bookInstance.entity';

export class BookInstanceDAO {
    private bookInstanceRepository = AppDataSource.getRepository(BookInstance);

    async getCount() {
        return await this.bookInstanceRepository.count();
    }

    async getAvailableCount() {
        return await this.bookInstanceRepository.count({
            where: { status: "Available" }
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
}
