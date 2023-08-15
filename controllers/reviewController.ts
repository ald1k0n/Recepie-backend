import { Response, Request } from 'express';
import { Recept, Review } from '@prisma/client';
import { db } from '../utils';

export const makeResponse = async (req: Request, res: Response) => {
	const { reviewRecepieId } = req.params;
	const { comment } = req.body as Review;

	try {
		const recepie = await db.recept.findUnique({
			where: {
				id: Number(reviewRecepieId),
			},
		});

		if (!recepie) throw new Error('Recept is not found');

		const review = await db.review.create({
			data: {
				comment,
				reviewRecepieId: Number(reviewRecepieId),
			},
		});
		return res.status(201).json(review);
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: error?.toString(),
		});
	}
};

export const editResponse = async (req: Request, res: Response) => {
	const { reviewId } = req.params;

	const { comment } = req.body as Review;

	try {
		const review = await db.review.findUnique({
			where: {
				id: Number(reviewId),
			},
		});

		if (!review) throw new Error('Review not found');

		const newReview = await db.review.update({
			where: {
				id: Number(reviewId),
			},
			data: {
				comment,
			},
		});
		return res.status(201).json(newReview);
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: error?.toString(),
		});
	}
};

export const deleteReview = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await db.review.delete({
			where: {
				id: Number(id),
			},
		});

		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
};
