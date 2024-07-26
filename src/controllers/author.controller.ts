import { Request, Response, NextFunction } from 'express';
import { AuthorDAO } from '../services/author.dao';
import asyncHandler from 'express-async-handler';
import i18next from 'i18next';

const authorDAO = new AuthorDAO();

export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorDAO.getAuthors()
    res.render('authors/', { authors, title: req.t('author.title.listOfAuthor') })
});

export const authorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Author detail: ${req.params.id}`);
});

export const authorCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] Author is created with GET method.');
});

export const authorCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] Author is created with POST method.');
});

export const authorDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Author ${req.params.id} is deleted with GET method.`);
});

export const authorDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Author ${req.params.id} is deleted with POST method.`);
});

export const authorUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Author ${req.params.id} is updated with GET method.`);
});

export const authorUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] Author ${req.params.id} is updated with POST method.`);
});
