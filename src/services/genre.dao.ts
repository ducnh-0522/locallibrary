import { AppDataSource } from '../config/data-source';
import { Genre } from '../entity/genre.entity';

export class GenreDAO {
    private genreRepository = AppDataSource.getRepository(Genre);

    async getCount() {
        return await this.genreRepository.count();
    }

    async getGenres() {
        return await this.genreRepository.find({ order: { name: 'ASC' } })
    }
}
