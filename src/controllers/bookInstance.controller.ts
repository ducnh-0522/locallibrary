import { Request, Response, NextFunction } from 'express';
import { BookDAO } from '../services/book.dao';
import { BookInstanceDAO } from '../services/book_instance.dao';
import { BookInstanceStatus } from '../enums/book_instance_status';
import { body, validationResult } from 'express-validator';
import * as constants from '../constants/CONST';
import asyncHandler from 'express-async-handler';
import i18next from 'i18next';

const bookDAO = new BookDAO();
const bookInstanceDAO = new BookInstanceDAO();

export const validateBookInstanceForm = [
    body('book')
    .trim()
    .isLength({ min: constants.MIN_FIELD_LENGTH })
    .escape()
    .withMessage((value, { req }) => req.t("error.empty_field")),
    body('imprint')
    .trim()
    .isLength({ min: constants.MIN_FIELD_LENGTH })
    .escape()
    .withMessage((value, { req }) => req.t('error.empty_field')),
    body('status')
    .trim()
    .isLength({ min: constants.MIN_FIELD_LENGTH })
    .escape()
    .withMessage((value, { req }) => req.t('error.empty_field')),
    body('due_back')
    .optional({ values: constants.FALSY })
    .isISO8601()
    .toDate()
    .withMessage((value, { req }) => req.t('error.book_instance_form.invalid_due_back')),
];

async function validateBookInstanceById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt (req.params.id);
    if (isNaN(id)) {
        res.render('error', { message: req.t('error.Invalid') });
        return;
    }
    const bookInstance = await bookInstanceDAO.getBookInstanceById(id);
    if (!bookInstance) {
        res.render('error', { message: req.t('error.NotFound') });
        return;
    }
    return bookInstance;
}

export const bookInstList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstances = await bookInstanceDAO.getBookInstances()
    res.render('bookInstances/', { 
        title: req.t('bookInstance.title.listOfBookInstance'),
        bookInstances,
        BookInstanceStatus
    })
});

export const bookInstDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await validateBookInstanceById(req, res, next);
    if (!bookInstance) return;
    res.render('bookInstances/show' , {
        bookInstance,
        bookInstanceBook: bookInstance.book,
        BookInstanceStatus
    });
});

export const bookInstCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const allBooks = await bookDAO.getBooks();
    res.render('bookInstances/form', {
        title: req.t('bookInstance.title.create'),
        allBooks,
        BookInstanceStatus
    });
});

export const bookInstCreatePost = [
    ...validateBookInstanceForm,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        const { book, imprint, status, dueBack } = req.body;
        if (!errors.isEmpty()) {
            const allBooks = await bookDAO.getBooks();
            res.render('bookInstances/form', {
                title: req.t('bookInstance.title.create'),
                allBooks,
                BookInstanceStatus,
                errors: errors.array()
            });
        } 
        else {
            const bookInstance = await bookInstanceDAO.createBookInstance(
                book,
                imprint,
                status,
                dueBack
            );
            res.redirect(`/bookInstances/${bookInstance.id}`);
        }
    }),
];

export const bookInstDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await validateBookInstanceById(req, res, next);
    if (!bookInstance) return;
    res.render('bookInstances/delete', {
        title: req.t('bookInstance.title.delete'),
        bookInstance,
        BookInstanceStatus
    });
});

export const bookInstDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await validateBookInstanceById(req, res, next);
    if (!bookInstance) return;
    await bookInstanceDAO.deleteBookInstance(bookInstance.id);
    res.redirect('/books');
});

export const bookInstUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await validateBookInstanceById(req, res, next);
    if (!bookInstance) return;
    const allBooks = await bookDAO.getBooks();
    res.render('bookInstances/form', {
        title: req.t('bookInstance.title.update'),
        allBooks,
        bookInstance,
        BookInstanceStatus
    });
});

export const bookInstUpdatePost = [
    ...validateBookInstanceForm,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        const { book, imprint, status, dueBack } = req.body;
        if (!errors.isEmpty()) {
            const allBooks = await bookDAO.getBooks();
            res.render('bookInstances/form', {
                title: req.t('bookInstance.title.update'),
                allBooks,
                bookInstance: req.body,
                BookInstanceStatus,
                errors: errors.array()
            });
        } 
        else {
            const bookInstance = await validateBookInstanceById(req, res, next);
            if (!bookInstance) return;
            await bookInstanceDAO.updateBookInstance(
                bookInstance,
                book,
                imprint,
                status,
                dueBack
            );
            res.redirect(`/bookInstances/${bookInstance.id}`);
        }
    }),
];
