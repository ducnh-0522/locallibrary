import express from 'express';
import * as genreController from '../controllers/genre.controller';

const router = express.Router();

router.get('', genreController.genreList);
router.get('/:id', genreController.genreDetail);

router.get('/create', genreController.genreCreateGet);
router.post('/create', genreController.genreCreatePost);

router.get('/:id/delete', genreController.genreDeleteGet);
router.post('/:id/delete', genreController.genreDeletePost);

router.get('/:id/update', genreController.genreUpdateGet);
router.post('/:id/update', genreController.genreUpdatePost);

export default router;
