import {
	authorizeUser,
	createUser,
	banUser,
} from './../controllers/userController';
import { Router } from 'express';

import { protect } from '../utils';

const router = Router();

router.post('/', createUser);
router.post('/login', authorizeUser);

router.patch('/admin/ban', protect, banUser);

module.exports = router;
