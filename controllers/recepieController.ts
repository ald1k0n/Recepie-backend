import { Request, Response } from 'express';
import { db } from '../utils';
import { Categories, Recept } from '@prisma/client';

export const getAllRecepies = async (req: Request, res: Response) => {
	try {
		const recepies = await db.recept.findMany({
			include: {
				ratings: true,
				ReviewRecepie: true,
			},
		});
		return res.status(200).json(recepies);
	} catch (error) {
		return res.sendStatus(404);
	}
};

interface IQuery {
	category?: string;
	title?: string;
}

export const getRecepieByFilter = async (req: Request, res: Response) => {
	const { category, title } = req.query as IQuery;
	console.log(req.query);
	const query: Recept = {} as Recept;

	if (category !== '' && category)
		query.category = mapCategoryStringToEnum(category!.toUpperCase())!;

	if (title !== '' && title)
		//@ts-ignore
		query.title = {
			contains: title!,
		};
	try {
		const recept = await db.recept.findMany({
			where: query!,
			include: {
				ratings: true,
				ReviewRecepie: true,
			},
		});
		return res.status(200).json(recept);
	} catch (error) {
		console.error(error);
		res.sendStatus(404);
	}
};

function mapCategoryStringToEnum(
	categoryString: string
): Categories | undefined {
	switch (categoryString.toUpperCase()) {
		case 'SPICY':
			return Categories.SPICY;
		case 'GRILL':
			return Categories.GRILL;
		case 'RUSSIAN':
			return Categories.RUSSIAN;
		case 'ASIAN':
			return Categories.ASIAN;
		case 'NATIONAL':
			return Categories.NATIONAL;
		default:
			return undefined;
	}
}

export const addRecepie = async (req: Request, res: Response) => {
	const { images, title, description, category } = req.body as Recept;

	try {
		const recept = await db.recept.create({
			data: {
				category: mapCategoryStringToEnum(category.toUpperCase())!,
				description,
				images: JSON.stringify(images),
				title,
			},
		});
		return res.status(201).json(recept);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
};

export const getRecepieById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const recept = await db.recept.findUnique({
			where: {
				id: Number(id),
			},
			include: {
				ReviewRecepie: {
					include: {
						Review: true,
					},
				},
				ratings: true,
			},
		});

		return res.status(200).json({
			...recept,
			images: JSON.parse(recept?.images!),
		});
	} catch (error) {
		console.error(error);
		return res.sendStatus(404);
	}
};

export const updateRecept = async (req: Request, res: Response) => {
	const { title, images, category, description } = req.body as Recept;
	const { id } = req.params;
	try {
		const isExist = await db.recept.findUnique({
			where: {
				id: Number(id),
			},
			select: {
				id: true,
			},
		});
		if (!isExist) throw new Error('Recepie not found');

		await db.recept.update({
			where: {
				id: isExist.id,
			},
			data: {
				category: mapCategoryStringToEnum(category.toUpperCase()!),
				description,
				images: JSON.stringify(images),
				title,
			},
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: error?.toString(),
		});
	}
};

export const deleteRecepie = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await db.recept.delete({
			where: {
				id: Number(id),
			},
		});
	} catch (error) {
		res.sendStatus(500);
	}
};

export const addRating = async (req: Request, res: Response) => {
	const { id } = req.params;

	const { rating } = req.body;

	try {
		const newRating = await db.rating.create({
			data: {
				rating,
				receptId: Number(id),
			},
		});

		return res.status(201).json(newRating);
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: error?.toString(),
		});
	}
};
