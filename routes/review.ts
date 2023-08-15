import {
	deleteReview,
	editResponse,
	makeResponse,
} from '../controllers/reviewController';

import { Router } from 'express';
import { protect } from '../utils';
const router = Router();

router.post('/:reviewRecepieId', protect, makeResponse);
router.patch('/:reviewId', protect, editResponse);
router.delete('/:id', protect, deleteReview);

module.exports = router;
