import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

export const bookList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('[NOT IMPLEMENTED] Book list...');
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
