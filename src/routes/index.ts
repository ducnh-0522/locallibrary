import { Router, NextFunction, Request, Response } from 'express';
// Import all route modules for the site here
import authorRouter from './author.route';
import bookRouter from './book.route';
import bookinstanceRouter from './bookInstance.route';
import genreRouter from './genre.route';

const router: Router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Express' });
});

/* Use Routes */
router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/bookInstances', bookinstanceRouter);
router.use('/genres', genreRouter);

export default router;
