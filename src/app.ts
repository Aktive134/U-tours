import express, { Request, Response, Application, NextFunction } from 'express';
import * as path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import httpLogger from './common/logging/http-logger';
import ApplicationError from './common/error-handler/ApplicationError';
import errorHandler from './middleware/error-handler';
import router from './routes';


const app: Application = express();
app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(httpLogger);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(router);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ApplicationError(`Can't find ${req.originalUrl} on this server`, 404));
})
app.use(errorHandler);

export default app;
