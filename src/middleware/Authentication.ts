import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
       
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(StatusCodes.UNAUTHORIZED).json(
            {
                message: 'Acesso negado'
            }
        )
    }

    try {

        const secret = process.env.SECRET;

        jwt.verify((token as string), (secret as string));

        next();

    }
    catch {
        res.status(StatusCodes.FORBIDDEN)
        .json(
            {
                message: 'invalid token'
            }
        );
    }
}