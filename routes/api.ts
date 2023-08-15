import { Router } from 'express';

const router = Router();

router.use('/auth', require('./auth'));
router.use('/recepie', require('./recepie'));
router.use('/review', require('./review'));

router.use('/upload', require('./upload'));

module.exports = router;
