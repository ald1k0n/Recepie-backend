import { Router } from 'express';
import {
	addRecepie,
	deleteRecepie,
	getAllRecepies,
	getRecepieByFilter,
	getRecepieById,
	updateRecept,
} from '../controllers/recepieController';

import { protect } from '../utils/';

const router = Router();

router.get('/', getAllRecepies);
router.get('/', getRecepieByFilter);
router.post('/', protect, addRecepie);

router.get('/:id', getRecepieById);

router.patch('/:id', protect, updateRecept);

router.delete('/:id', protect, deleteRecepie);

module.exports = router;
