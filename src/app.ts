import express, { Request, Application, Response } from 'express';

import cors from 'cors';
import { StudentRoutes } from './app/modules/stduent/stduent.route';

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/stduent', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

export default app;
