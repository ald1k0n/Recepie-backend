import { db, verifyToken } from '../utils';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	try {
		const user = await db.user.create({
			data: {
				username,
				password: bcrypt.hashSync(password, 8),
			},
			select: {
				username: true,
				id: true,
				isBanned: true,
				role: true,
			},
		});
		return res.status(201).json(user);
	} catch (error) {
		console.error(error);
		return res.status(500).send(error);
	}
};

export const authorizeUser = async (req: Request, res: Response) => {
	const { username, password } = req.body as User;
	try {
		const candidate = await db.user.findUnique({
			where: { username },
		});
		if (!candidate) throw new Error('User is not defined');
		if (!bcrypt.compareSync(password, candidate.password))
			throw new Error('Password did not match');

		if (candidate.isBanned) throw new Error('User was banned');

		const token = jwt.sign({ id: candidate.id }, process.env.TOKEN!, {
			expiresIn: '1d',
		});

		return res.status(200).json({
			user: {
				...candidate,
				password: null,
			},
			token,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: error?.toString(),
		});
	}
};

export const banUser = async (req: Request, res: Response) => {
	const { id } = req.body as User;

	try {
		const token = req.headers?.authorization?.split(' ')[1];

		const adminId: { id: number } = (await verifyToken(token!)) as {
			id: number;
		};

		const user = await db.user.findUnique({
			where: {
				id: adminId?.id!,
			},
		});
		if (user?.role !== 'ADMIN')
			throw new Error('You are not allowed to ban user!');

		await db.user.update({
			where: {
				id,
			},
			data: {
				isBanned: true,
			},
		});

		return res.status(200).json({
			message: 'User was banned',
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: error?.toString(),
		});
	}
};
