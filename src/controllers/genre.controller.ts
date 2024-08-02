import { Request, Response, NextFunction } from 'express';
import { BookDAO } from '../services/book.dao';
import { GenreDAO } from '../services/genre.dao';
import { body, validationResult } from 'express-validator';
import * as constants from '../constants/CONST';
import asyncHandler from 'express-async-handler';
import i18next from 'i18next';

const bookDAO = new BookDAO();
const genreDAO = new GenreDAO();

export const validateGenreForm = [
    body('name')
    .trim()
    .isLength({ min: constants.MIN_GENRE_LENGTH })
    .escape()
    .withMessage((value, { req }) => req.t('error.genre_form.invalid_name'))
];

async function validateGenreById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt (req.params.id);
    if (isNaN(id)) {
        res.render('error', { message: req.t('error.Invalid') });
        return;
    }
    const genre = await genreDAO.getGenreById(id);
    if (!genre) {
        res.render('error', { message: req.t('error.NotFound') });
        return;
    }
    return genre;
}

export const genreList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreDAO.getGenres()
    res.render('genres/', { genres, title: req.t('genre.title.listOfGenre') })
});

export const genreDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGenreById(req, res, next);
    if (!genre) return;
    res.render('genres/show' , {
        genre,
        genreBooks: genre.books,
    });
});

export const genreCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.render('genres/form', { title: req.t('genre.title.create') });
});

export const genreCreatePost = [
    ...validateGenreForm,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('genres/form', {
                title: req.t('genre.title.create'),
                genre: req.body,
                errors: errors.array(),
            });
        } 
        else {
            const genreExists = await genreDAO.getGenreByName(req.body.name);
            if (genreExists) {
                res.redirect(`/genres/${genreExists.id}`);
            } 
            else {
                const genre = await genreDAO.createGenre(req.body.name);
                res.redirect(`/genres/${genre.id}`);
            }
        }
    }),
];

export const genreDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGenreById(req, res, next);
    if (!genre) return;
    res.render('genres/delete', {
        title: req.t('genre.title.delete'),
        genre,
        genreBooks: genre.books,
    });
});

export const genreDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGenreById(req, res, next);
    if (!genre) return;
    if (genre.books.length > 0) {
        res.render("genre/delete", {
            title: req.t("genre.title.delete"),
            genre,
            genreBooks: genre.books,
        });
    }
    else {
        await genreDAO.deleteGenre(genre.id);
        res.redirect('/genres');
    }
});

export const genreUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGenreById(req, res, next);
    if (!genre) return;
    res.render('genres/form', {
        title: req.t('genre.title.update'),
        genre,
    });
});

export const genreUpdatePost = [
    ...validateGenreForm,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('genres/form', {
                title: req.t('genre.title.update'),
                genre: req.body,
                errors: errors.array(),
            });
        }
        else {
            const genreExists = await genreDAO.getGenreByName(req.body.name);
            if (genreExists) {
                res.redirect(`/genres/${genreExists.id}`);
            } 
            else {
                const genre = await validateGenreById(req, res, next);
                if (!genre) return;
                await genreDAO.updateGenre(genre, req.body.name);
                res.redirect(`/genres/${genre.id}`);
            }
        }
    }),
];
