import { connectDB } from './database/db';
import { app } from './server/Server'
import 'dotenv/config';

const port = process.env.PORT || 4000;

async function runServer () {

    try {
        await connectDB();
        app.listen(
            port, 
            () => {
                console.log(`Running server on port ${port}`);
            }
        )
    } catch(err){
        console.log('Erro ao iniciar o servidor: ' + (err as Error).message);
    }
}

runServer();