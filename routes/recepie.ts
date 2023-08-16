import { Router } from 'express';
import {
	addRecepie,
	deleteRecepie,
	getAllRecepies,
	getRecepieByFilter,
	getRecepieById,
	updateRecept,
	addRating,
} from '../controllers/recepieController';

import { protect } from '../utils/';

const router = Router();

router.get('/', getAllRecepies);
router.get('/search', getRecepieByFilter);
router.post('/', protect, addRecepie);

router.get('/:id', getRecepieById);

router.patch('/:id', protect, updateRecept);

router.put('/:id', protect, addRating);
router.delete('/:id', protect, deleteRecepie);

// router.get('/:id/:receptId', getLikeCount);

module.exports = router;
