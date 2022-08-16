import mongoose from "mongoose";
import express from "express";
import { config } from "./configs/server.js";
import { host, port } from "./configs/environment.js";
import { mongodb_connection } from "./configs/database.js";
import router from "./routes/notesRoute.js";

const app = config(express(), router);
app.set("port", port || 5000);

mongodb_connection(mongoose);

const server = app.listen(app.get('port'), () => {
    console.log(`server is running on: http://localhost:${app.get('port')}`);
});
