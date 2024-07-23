import { Router, NextFunction, Request, Response } from 'express';

const router: Router = Router();

/* GET users listing. */
router.get('/users', (req: Request, res: Response, next: NextFunction) => {
    res.send('respond with a resource');
});

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Express' });
});

export default router;
