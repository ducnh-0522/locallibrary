import { Request, Response, NextFunction } from 'express';
import { GenreDAO } from '../services/genre.dao';
import asyncHandler from 'express-async-handler';
import i18next from 'i18next';

const genreDAO = new GenreDAO();

export const genreList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreDAO.getGenres()
    res.render('genres/', { genres, title: req.t('genre.title.listOfGenre') })
});

export const genreDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt (req.params.id);
    if (isNaN(id)) {
        return res.render('error', { message: req.t('error.Invalid') });
    }
    const genre = await genreDAO.getGenreById(id);
    if (!genre) {
        return res.render('error', { message: req.t('error.NotFound') });
    }
    res.render('genres/show' , {
        genre,
        genreBooks: genre.books,
    });
});

export const genreCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] Genre create GET');
});

export const genreCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] Genre create POST');
});

export const genreDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Genre delete GET ${req.params.id}`);
});

export const genreDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Genre delete POST ${req.params.id}`);
});

export const genreUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Genre update GET ${req.params.id}`);
});

export const genreUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Genre update POST ${req.params.id}`);
});
