/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { TLoginData, UserService } from "../service/UserService";
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

    public async login(req: Request<{}, {}, TLoginData>, res: Response){

        try {
            this.userService.login(req.body);

            res.status(StatusCodes.OK).json(
                {
                    message: 'login sucess',
                }
            );
            
        } catch (err){
            res.status(StatusCodes.BAD_REQUEST).json(
                {
                    message: (err as Error).message,
                }
            )
        }

    }
}

export type TRegisterUserRequestDto = {
    name: string,
    email: string,
    password: string,
    confirmpassword: string
}