import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import { MongoDbRepository } from "../repositories/MongoDbRepository";
import { UserService } from "../service/UserService";

const router = Router();

const mongodbRepository = MongoDbRepository.getInstance();
const userService = UserService.getInstance(mongodbRepository);
const userController = UserController.getInstance(userService);

router.get(
    '/',
    (_: Request, res: Response) => {
        res.json(
            {
                message: 'Welcome to my web server'
            }
        );
    }
)

router.post(
    '/auth/register',
    userController.register.bind(userController)
)

export { router }