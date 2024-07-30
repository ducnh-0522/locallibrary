import express from 'express';
import * as authorController from '../controllers/author.controller';

const router = express.Router();

router.get('/', authorController.authorList);

router.get('/create', authorController.authorCreateGet);
router.post('/create', authorController.authorCreatePost);

router.get('/:id', authorController.authorDetail);

router.get('/:id/delete', authorController.authorDeleteGet);
router.post('/:id/delete', authorController.authorDeletePost);

router.get('/:id/update', authorController.authorUpdateGet);
router.post('/:id/update', authorController.authorUpdatePost);

export default router;
