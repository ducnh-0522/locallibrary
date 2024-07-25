import { AppDataSource } from '../config/data-source';
import { Author } from '../entity/author.entity';

export class AuthorDAO {
    private authorRepository = AppDataSource.getRepository(Author);

    async getCount() {
        return await this.authorRepository.count();
    }

}
