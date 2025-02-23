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

    public async getUserByEmail(email: string){
        try {
            const user = await UserModel.findOne(
                {
                    email: email
                }
            );

            return user;
        }
        catch(err){
            throw new Error((err as Error).message);
        }
    }

    public async saveUser(data: TUserData): Promise<TUserData> {
        const user = UserModel.create(
            {
                name: data.name,
                email: data.email,
                password: data.password
            }
        );

        return user;
    }
}