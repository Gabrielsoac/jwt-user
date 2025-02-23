import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get(
    '/',
    (_: Request, res: Response) => {
        res.json(
            {
                message: 'Welcome to my web server'
            }
        );
    }
)

export { app };