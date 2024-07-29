import { Request, Response, NextFunction } from 'express';
import { AuthorDAO } from '../services/author.dao';
import { BookDAO } from '../services/book.dao';
import { BookInstanceDAO } from '../services/book_instance.dao';
import { GenreDAO } from '../services/genre.dao';
import asyncHandler from 'express-async-handler';
import i18next from 'i18next';

const authorDAO = new AuthorDAO();
const bookDAO = new BookDAO();
const bookInstanceDAO = new BookInstanceDAO();
const genreDAO = new GenreDAO();

export const index = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const [
        numBooks,
        numBookInstances,
        availableBookInstances,
        numGenres,
        numAuthors,
    ] = await Promise.all([
        bookDAO.getCount(),
        bookInstanceDAO.getCount(),
        bookInstanceDAO.getAvailableCount(),
        genreDAO.getCount(),
        authorDAO.getCount(),
    ]);

    res.render('index', {
        title: 'Local Library',
        book_count: numBooks,
        book_instance_count: numBookInstances,
        book_instance_available_count: availableBookInstances,
        author_count: numAuthors,
        genre_count: numGenres
    });
});

export const bookList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const books = await bookDAO.getBooks();
    res.render('books/', { books, title: req.t('book.title.listOfBook') })
});

export const bookDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Book detail: ${req.params.id}`);
});

export const bookCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] Book is created GET method.');
});

export const bookCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] Book is created with POST method.');
});

export const bookDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Book ${req.params.id} is deleted with GET method.`);
});

export const bookDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Book ${req.params.id} is deleted with POST method.`);
});

export const bookUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Book ${req.params.id} is updated with GET method.`);
});

export const bookUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Book ${req.params.id} is updated with POST method.`);
});
