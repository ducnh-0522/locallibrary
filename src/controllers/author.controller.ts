import { Request, Response, NextFunction } from 'express';
import { AuthorDAO } from '../services/author.dao';
import { body, validationResult } from 'express-validator';
import * as constants from '../constants/CONST';
import asyncHandler from 'express-async-handler';
import i18next from 'i18next';

const authorDAO = new AuthorDAO();

export const validateAuthorForm = [
    body("first_name")
    .trim()
    .isLength({ min: constants.MIN_FIELD_LENGTH })
    .escape()
    .withMessage((value, { req }) => req.t("error.author_form.empty_first_name"))
    .isAlphanumeric()
    .withMessage((value, { req }) => req.t("error.author_form.invalid_first_name")),
    body("family_name")
    .trim()
    .isLength({ min: constants.MIN_FIELD_LENGTH })
    .escape()
    .withMessage((value, { req }) => req.t("error.author_form.empty_family_name"))
    .isAlphanumeric()
    .withMessage((value, { req }) => req.t("error.author_form.invalid_family_name")),
    body("date_of_birth")
    .optional({ values: constants.FALSY })
    .isISO8601()
    .toDate()
    .withMessage((value, { req }) => req.t("error.author_form.invalid_dob")),
    body("date_of_death")
    .optional({ values: constants.FALSY })
    .isISO8601()
    .toDate()
    .withMessage((value, { req }) => req.t("error.author_form.invalid_dod")),
];

async function validateAuthorById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.render('error', { message: req.t('error.Invalid') });
        return;
    }
    const author = await authorDAO.getAuthorById(id);
    if (!author) {
        res.render('error', { message: req.t('error.NotFound') });
        return;
    }
    return author;
}

export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorDAO.getAuthors()
    res.render('authors/', { authors, title: req.t('author.title.listOfAuthor') })
});

export const authorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = await validateAuthorById(req, res, next);
    if (!author) return;
    res.render('authors/show' , {
        author,
        authorBooks: author.books,
    });
});

export const authorCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.render('authors/form', { title: req.t('author.title.create') });
});

export const authorCreatePost = [
    ...validateAuthorForm,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        const { first_name, family_name, date_of_birth, date_of_death } = req.body;
        if (!errors.isEmpty()) {
            res.render("authors/form", {
                title: req.t("author.title.create"),
                author: req.body,
                errors: errors.array(),
            });
        }
        else {
            const author = await authorDAO.createAuthor(
                first_name,
                family_name,
                date_of_birth,
                date_of_death
            );
            res.redirect(`/authors/${author.id}`);
        }
    }), 
];

export const authorDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = await validateAuthorById(req, res, next);
    if (!author) return;
    res.render("authors/delete", {
        title: req.t("author.title.delete"),
        author,
        authorBooks: author.books,
    });
});

export const authorDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = await validateAuthorById(req, res, next);
    if (!author) return;
    if (author.books.length > 0) {
        res.render("authors/delete", {
            title: req.t("author.title.delete"),
            author,
            authorBooks: author.books
        });
    }
    else {
        await authorDAO.deleteAuthor(author.id);
        res.redirect('/authors');
    }
});

export const authorUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = await validateAuthorById(req, res, next);
    if (!author) return;
    res.render("authors/form", {
        title: req.t("author.title.update"),
        author,
    });
});

export const authorUpdatePost = [
    ...validateAuthorForm,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        const { first_name, family_name, date_of_birth, date_of_death } = req.body;
        if (!errors.isEmpty()) {
            res.render("authors/form", {
                title: req.t("author.title.update"),
                author: req.body,
                errors: errors.array(),
            });
        }
        else {
            const author = await validateAuthorById(req, res, next);
            if (!author) return;
            await authorDAO.updateAuthor(
                author,
                first_name,
                family_name,
                date_of_birth,
                date_of_death
            );
            res.redirect(`/authors/${author.id}`);
        }
    }),
];
