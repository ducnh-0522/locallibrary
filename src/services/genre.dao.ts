import { AppDataSource } from '../config/data-source';
import { Genre } from '../entity/genre.entity';
import { In } from 'typeorm';

export class GenreDAO {
    private genreRepository = AppDataSource.getRepository(Genre);

    async getCount() {
        return await this.genreRepository.count();
    }

    async getGenres() {
        return await this.genreRepository.find({ order: { name: 'ASC' } })
    }

    async getGenreByName(name: string) {
        return await this.genreRepository.findOne({ where: { name } });
    }

    async getGenreById(id: number) {
        return await this.genreRepository.findOne({
            where: { id },
            relations: ['books']
        });
    }

    async getGenresByIds(ids: number[]) {
        return await this.genreRepository.find({
            where: { id: In(ids) }
        });
    }

    async createGenre(name: string) {
        const genre = new Genre();
        genre.name = name;
        return await this.genreRepository.save(genre);
    }

    async updateGenre(genre: Genre, name: string) {
        genre.name = name;
        return await this.genreRepository.save(genre);
    }

    async deleteGenre(id: number) {
        return await this.genreRepository.delete(id);
    }
}
