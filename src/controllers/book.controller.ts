import { Request, Response, NextFunction } from 'express';
import { AuthorDAO } from '../services/author.dao';
import { BookDAO } from '../services/book.dao';
import { BookInstanceDAO } from '../services/book_instance.dao';
import { GenreDAO } from '../services/genre.dao';
import { BookInstanceStatus } from '../enums/book_instance_status';
import { body, validationResult } from 'express-validator';
import * as constants from '../constants/CONST';
import asyncHandler from 'express-async-handler';
import i18next from 'i18next';

const authorDAO = new AuthorDAO();
const bookDAO = new BookDAO();
const bookInstanceDAO = new BookInstanceDAO();
const genreDAO = new GenreDAO();

export const validateBookForm = [
    body('title')
    .trim().isLength({ min: constants.MIN_FIELD_LENGTH }).escape()
    .withMessage((value, { req }) => req.t("error.book_form.empty_title")),
    body('author')
    .trim().isLength({ min: constants.MIN_FIELD_LENGTH }).escape()
    .withMessage((value, { req }) => req.t("error.book_form.empty_author")),
    body('summary')
    .trim().isLength({ min: constants.MIN_FIELD_LENGTH }).escape()
    .withMessage((value, { req }) => req.t("error.book_form.empty_summary")),
    body('isbn')
    .trim().isLength({ min: constants.MIN_FIELD_LENGTH }).escape()
    .withMessage((value, { req }) => req.t("error.book_form.empty_isbn")),
    body('genre.*')
    .optional().escape(),
];

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

async function validateBookById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.render('error', { message: req.t('error.Invalid') });
        return;
    }
    const book = await bookDAO.getBookById(id);
    if (!book) {
        res.render('error', { message: req.t('error.NotFound') });
        return;
    }
    return book;
}

export const bookList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const books = await bookDAO.getBooks();
    res.render('books/', { books, title: req.t('book.title.listOfBook') })
});

export const bookDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = await validateBookById(req, res, next);
    if (!book) return;
    res.render('books/show' , {
        book,
        bookInstances: book.instances,
        bookGenres: book.genres,
        BookInstanceStatus
    });
});

export const bookCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const [authors, genres] = await Promise.all([
        authorDAO.getAuthors(),
        genreDAO.getGenres(),
    ]);
    res.render("books/form", {
        title: req.t("book.title.create"),
        authors,
        genres
    });
});

export const bookCreatePost = [
    ...validateBookForm, 
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);    
        const { title, author, isbn, summary, genres } = req.body;
        const genreIds = typeof genres === 'string' ? [parseInt(genres, 10)] :
                Array.isArray(genres) ? genres.map(id => parseInt(id, 10)) : [];
        if (!errors.isEmpty()) {
            const [authors, genres] = await Promise.all([
                authorDAO.getAuthors(),
                genreDAO.getGenres()
            ]);
            res.render('books/form', {
                title: req.t("book.title.create"),
                authors,
                genres,
                book: req.body,
                errors: errors.array()
            });
        }
        else {
            const genres = await genreDAO.getGenresByIds(genreIds);
            const book = await bookDAO.createBook(
                title,
                author,
                summary,
                isbn,
                genres
            );
            res.redirect(`/books/${book.id}`);
        }
    }),
];

export const bookDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = await validateBookById(req, res, next);
    if (!book) return;
    res.render("books/delete", {
        title: req.t("book.title.delete"),
        book,
        bookInstances: book.instances,
        bookGenres: book.genres,
        BookInstanceStatus
    });
});

export const bookDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = await validateBookById(req, res, next);
    if (!book) return;
    if (book.instances.length > 0) {
        res.render("books/delete", {
            title: req.t("book.title.delete"),
            book,
            bookInstances: book.instances,
            bookGenres: book.genres,
            BookInstanceStatus
        });
    }
    else {
        await bookDAO.deleteBook(book.id);
        res.redirect('/books');
    }
});

export const bookUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = await validateBookById(req, res, next);
    if (!book) return;
    let bookGenres: number[] = [];
    if (book.genres) { // Check if book has genres
        bookGenres = book.genres.map((genre) => genre.id); // Extract genre IDs
    }
    const [allAuthors, allGenres] = await Promise.all([
        authorDAO.getAuthors(),
        genreDAO.getGenres(),
    ]);
    res.render("books/form", {
        title: req.t("book.title.update"),
        book,
        authors: allAuthors,
        genres: allGenres,
        bookGenres
    });
});

export const bookUpdatePost = [
    ...validateBookForm, 
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);    
        const { title, author, isbn, summary, genres } = req.body;
        const genreIds = typeof genres === 'string' ? [parseInt(genres, 10)] :      // string: book has 1 genre only
                Array.isArray(genres) ? genres.map(id => parseInt(id, 10)) : [];    // array: book has many genres, or zero
        if (!errors.isEmpty()) {
            const [allAuthors, allGenres] = await Promise.all([
                authorDAO.getAuthors(),
                genreDAO.getGenres()
            ]);
            res.render('books/form', {
                title: req.t("book.title.update"),
                allAuthors,
                allGenres,
                book: req.body,
                errors: errors.array()
            });
        }
        else {
            const book = await validateBookById(req, res, next);
            if (!book) return;
            const genres = await genreDAO.getGenresByIds(genreIds);
            await bookDAO.updateBook(
                book,
                title,
                author,
                summary,
                isbn,
                genres
            );
            res.redirect(`/books/${book.id}`);
        }
    }),
];
