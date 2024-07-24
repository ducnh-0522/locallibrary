import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

export const bookInstList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] BookInstance list...');
});

export const bookInstDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] BookInstance detail: ${req.params.id}`);
});

export const bookInstCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] BookInstance is created with GET method.');
});

export const bookInstCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] BookInstance is created with POST method.');
});

export const bookInstDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] BookInstance delete GET method. ${req.params.id}`);
});

export const bookInstDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] BookInstance delete POST method. ${req.params.id}`);
});

export const bookInstUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] BookInstance update GET method. ${req.params.id}`);
});

export const bookInstUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`[NOT IMPLEMENTED] BookInstance update POST method. ${req.params.id}`);
});
