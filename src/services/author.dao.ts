import { AppDataSource } from '../config/data-source';
import { Author } from '../entity/author.entity';

interface AuthorForm {
    firstName: string;
    familyName: string;
    dateOfBirth?: Date;
    dateOfDeath?: Date;
}

export class AuthorDAO {
    private authorRepository = AppDataSource.getRepository(Author);

    async getCount() {
        return await this.authorRepository.count();
    }

    async getAuthors() {
        return await this.authorRepository.find({ 
            order: { firstName: 'ASC' }
        });
    }

    async getAuthorById(id: number) {
        return await this.authorRepository.findOne({
            where: { id },
            relations: ['books'],
        });
    }

    async createAuthor(
        first_name: string,
        family_name: string,
        date_of_birth?: Date,
        date_of_death?: Date
    ): Promise<Author> {
        const author = new Author();
        author.firstName = first_name;
        author.familyName = family_name;
        if (date_of_birth) author.dateOfBirth = date_of_birth;
        if (date_of_death) author.dateOfDeath = date_of_death;
        return await this.authorRepository.save(author);
    };

    async updateAuthor(
        author: Author,
        first_name: string,
        family_name: string,
        date_of_birth?: Date,
        date_of_death?: Date
    ): Promise<Author> {
        author.firstName = first_name;
        author.familyName = family_name;
        if (date_of_birth) author.dateOfBirth = date_of_birth;
        if (date_of_death) author.dateOfDeath = date_of_death;
        return await this.authorRepository.save(author);
    }

    async deleteAuthor(id: number) {
        return await this.authorRepository.delete(id);
    }
}
