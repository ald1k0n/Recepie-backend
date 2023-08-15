import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.TOKEN!, (err, payload) => {
			if (err) {
				const message =
					err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
				return reject(message);
			}
			resolve(payload);
		});
	});
};

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.headers.authorization) {
		return res.sendStatus(401);
	}
	const token = req.headers.authorization.split(' ')[1];
	if (!token) return res.sendStatus(401);
	await verifyToken(token)
		.then((user) => {
			//@ts-ignore
			req.user = user;
			next();
		})
		.catch(() => res.sendStatus(401));
};
