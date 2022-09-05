import {
    json, urlencoded, Express,
    Router, Request, Response,
    NextFunction,
} from 'express';
import cors from 'cors';
import {nodeEnv} from './environment';
import logger from 'morgan';
import createError from 'http-errors';
import helmet from 'helmet';

export const config: any = (app: Express, routes: Router) => {
    app.use(cors()); // enable all cors
    app.use(helmet()); // helmet for securing api

    app.use(json()); // initialize that is json request
    app.use(urlencoded({extended: true})); // encoding the url
    app.use('/api/', routes); // prefix of api

    nodeEnv !== 'production' ?
        app.use(logger('dev')) : app.use(logger('combined'));

    // 404 error if there is no valid url
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(createError(404));
    });

    // handling error
    app.use((err: any, req: Request, res: Response) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.json({
            error: err,
        });
    });

    return app;
};
