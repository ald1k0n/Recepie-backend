import { protect } from '../utils';
import { getAllUsers } from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.use('/auth', require('./auth'));
router.use('/recepie', require('./recepie'));
router.use('/review', require('./review'));

router.use('/upload', require('./upload'));

router.get('/users', protect, getAllUsers);

module.exports = router;
