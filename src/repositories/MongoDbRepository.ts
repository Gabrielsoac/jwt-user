import { UserModel } from "../database/models/UserModel";
import { TUserData } from "../service/UserService";

export class MongoDbRepository {

    private static instance: MongoDbRepository;

    private constructor(){

    }

    public static getInstance(){
        if(!MongoDbRepository.instance){
            MongoDbRepository.instance = new MongoDbRepository();
        }
        return MongoDbRepository.instance;
    }

    public async getUserByEmail(email: string): Promise<TUserPersisted | null >{
        try {
            const user = await UserModel.findOne(
                {
                    email: email
                }
            );

            if(user){
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    password: user.password
                };
            }

            return null;
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }

    public async saveUser(data: TUserData): Promise<TUserPersisted> {
        
        const user = await UserModel.create(
            {
                name: data.name,
                email: data.email,
                password: data.password
            }
        );

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            password: user.password
        }
    }

    public async findUserById(id: string): Promise<TUserPersisted | null> {
        
        try {
            const user = await UserModel.findById(id);

            if(!user){
                return null;
            }

            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                password: user.password
            }
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }
}

export type TUserPersisted = {
    id: string,
    name: string
    email: string,
    password: string
}