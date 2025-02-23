import { app } from './server/Server'
import 'dotenv/config';

const port = process.env.PORT || 4000;

function runServer () {
    console.log('hello, my web server');
    console.log(`Running server on port ${port}`);
}

app.listen(
    port,
    runServer
)