import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { StatusCodes } from "http-status-codes";

export class UserController {

    private static instance: UserController;
    private userService: UserService;

    private constructor(userService: UserService) {
        this.userService = userService;
    }

    public static getInstance(userService: UserService){
        if(!UserController.instance){
            UserController.instance = new UserController(userService);
        }
        return UserController.instance;
    }

    public async register(req: Request, res: Response) {
        const {name, email, password, confirmpassword} = req.body;

        const user = await this.userService.register(
            {
                name,
                email,
                password,
                confirmpassword
            }
        )

        res.status(StatusCodes.CREATED).json(
            {...user}
        );
    } 
}

export type TRegisterUserRequestDto = {
    name: string,
    email: string,
    password: string,
    confirmpassword: string
}