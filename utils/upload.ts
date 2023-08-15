import { config } from 'dotenv';
config();
import multer from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.UPLOAD_DEST!);
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

export const upload = multer({ storage: storage });
