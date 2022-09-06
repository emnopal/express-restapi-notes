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
    app.use(cors());
    app.use(helmet());

    app.use(json());
    app.use(urlencoded({
        extended: true,
    }));
    app.use('/api/', routes);

    nodeEnv !== 'production' ?
        app.use(logger('dev')) : app.use(logger('combined'));

    app.use((req: Request, res: Response, next: NextFunction) => {
        next(createError(404));
    });

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
