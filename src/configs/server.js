import {json, urlencoded} from 'express';
import cors from 'cors';
import {nodeEnv} from './environment.js';
import logger from 'morgan';
import createError from 'http-errors';

export const config = (app, routes) => {
    app.use(cors()); // enable all cors

    app.use(json()); // initialize that is json request
    app.use(urlencoded({extended: true})); // encoding the url
    app.use('/api/', routes); // prefix of api

    nodeEnv !== 'production' ?
        app.use(logger('dev')) : app.use(logger('combined'));

    app.use((req, res, next) => { // 404 error if there is no valid url
        next(createError(404));
    });

    app.use((err, req, res, next) => { // handling error
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.json({
            error: err,
        });
    });

    return app;
};

