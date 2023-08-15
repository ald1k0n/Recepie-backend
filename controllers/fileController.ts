import { Request, Response } from 'express';

export const uploadFiels = async (req: Request, res: Response) => {
	//@ts-ignore
	const images = req.files?.map((file) => file.filename);

	try {
		if (images.length === 0) throw new Error('Images was not specified');
		return res.status(200).json({
			images,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: error?.toString(),
		});
	}
};
