import mongoose from "mongoose";
import 'dotenv/config';

const port_DB = process.env.PORT_DB;
const user_DB = process.env.USER_DB;
const password_DB = process.env.PASSWORD_DB;

const URL = `mongodb://${user_DB}:${password_DB}@localhost:${port_DB}/users?authSource=admin`

const connectDB = async () => {
    console.log(URL);
    try {
        await mongoose.connect(URL);
        console.log('conectado ao db com sucesso');
    }
    catch(err){
        throw new Error((err as Error).message)}
}

export { connectDB };
