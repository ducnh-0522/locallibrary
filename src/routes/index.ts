import { Router, NextFunction, Request, Response } from 'express';
// Import all route modules for the site here
import authorRouter from './author.route';
import bookRouter from './book.route';
import bookinstanceRouter from './bookInstance.route';
import genreRouter from './genre.route';
import { index } from '../controllers/book.controller';

const router: Router = Router();

/* Use Routes */
router.use('/', index);
router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/bookInstances', bookinstanceRouter);
router.use('/genres', genreRouter);

export default router;
