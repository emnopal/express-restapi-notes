import mongoose from 'mongoose';
import express from 'express';
import {config} from './configs/server.js';
import {port} from './configs/environment.js';
import {mongodbConnection} from './configs/database.js';
import router from './routes/notesRoute.js';

const app = config(express(), router);
app.set('port', port || 5000);

mongodbConnection(mongoose);

app.listen(app.get('port'), () => {
    console.log(`server is running on: http://localhost:${app.get('port')}`);
});
