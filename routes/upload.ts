import { Router } from 'express';
const router = Router();
import { protect, upload } from '../utils';

import { uploadFiels } from '../controllers/fileController';

router.post('/', protect, upload.array('images'), uploadFiels);

module.exports = router;
