import mongoose from 'mongoose';
import express from 'express';
import {config} from './configs/server';
import {port} from './configs/environment';
import {mongodbConnection} from './configs/database';
import router from './routes/notesRoute';

const app: any = config(express(), router);
app.set('port', port || 5000);

mongodbConnection(mongoose);

app.listen(app.get('port'), () => {
    console.log(`server is running on: http://localhost:${app.get('port')}`);
});

export default app;
