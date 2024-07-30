import express from 'express';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

router.get('/', bookController.bookList);

router.get('/create', bookController.bookCreateGet);
router.post('/create', bookController.bookCreatePost);

router.get('/:id', bookController.bookDetail);

router.get('/:id/delete', bookController.bookDeleteGet);
router.post('/:id/delete', bookController.bookDeletePost);

router.get('/:id/update', bookController.bookUpdateGet);
router.post('/:id/update', bookController.bookUpdatePost);

export default router;
