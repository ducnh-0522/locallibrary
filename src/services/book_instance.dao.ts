import { AppDataSource } from '../config/data-source';
import { BookInstance } from '../entity/bookInstance.entity';
import { BookInstanceStatus } from '../enums/book_instance_status';

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
}
