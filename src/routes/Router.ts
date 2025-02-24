import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import { MongoDbRepository } from "../repositories/MongoDbRepository";
import { UserService } from "../service/UserService";
import { auth } from "../middleware/Authentication";

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

router.get(
    '/user/:id',
    auth,
    userController.getUser.bind(userController)
);

router.post(
    '/auth/register',
    userController.register.bind(userController)
);

router.post(
    '/auth/login',
    userController.login.bind(userController)
);

export { router }