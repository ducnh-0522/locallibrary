import express from 'express';
import * as bookInstController from '../controllers/bookInstance.controller';

const router = express.Router();

router.get('/', bookInstController.bookInstList);
router.get('/:id', bookInstController.bookInstDetail);

router.get('/create', bookInstController.bookInstCreateGet);
router.post('/create', bookInstController.bookInstCreatePost);

router.get('/:id/delete', bookInstController.bookInstDeleteGet);
router.post('/:id/delete', bookInstController.bookInstDeletePost);

router.get('/:id/update', bookInstController.bookInstUpdateGet);
router.post('/:id/update', bookInstController.bookInstUpdatePost);

export default router;
