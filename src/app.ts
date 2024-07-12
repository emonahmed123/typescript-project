import express, { Request, Application, Response, NextFunction,  } from 'express';

import cors from 'cors';
import { StudentRoutes } from './app/modules/stduent/stduent.route';
import { userRoutes } from './app/modules/user/user.route';
import { error } from 'console';
import gobleErrorhandler from './app/middleware/gobleErrorhandler';
import notFound from './app/middleware/Notfound';
import router from './app/routes';

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/',router);


const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

app.use(gobleErrorhandler)
app.use(notFound)



export default app;
