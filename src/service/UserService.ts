import { TRegisterUserRequestDto } from "../controllers/UserController";
import { MongoDbRepository } from "../repositories/MongoDbRepository";
import bcrypt from 'bcrypt';

export class UserService {

    private static instance: UserService;
    private mongodbRepository: MongoDbRepository;

    private constructor(mongodbRepository: MongoDbRepository){
        this.mongodbRepository = mongodbRepository;
    }

    public static getInstance(mongodbRepository: MongoDbRepository) {

        if(!UserService.instance){
            UserService.instance = new UserService(mongodbRepository);
        }
        return UserService.instance;
    }

    public async register(userData: TRegisterUserRequestDto): Promise<TUserPersisted> {

        const userExists = await this.mongodbRepository.getUserByEmail(userData.email);

        if(userExists){
            throw new Error('User with email ' + userData.email + 'already exists');
        }

        if(userData.password !== userData.confirmpassword){
            throw new Error('Password and confirm password should be equals');
        }

        const salt = 12;
        const hashPassword = await bcrypt.hash(userData.password, salt);

        const user = await this.mongodbRepository.saveUser(
            {
                name: userData.name,
                email: userData.email,
                password: hashPassword
            }
        );

        return {
            name: user.name,
            email: user.email
        }
    }
}

export type TUserData = {
    name: string,
    email: string,
    password: string
}

export type TUserPersisted = {
    name: string,
    email: string
}