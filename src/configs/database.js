import {db, schema} from './environment.js';

export const mongodbConnection = (mongoose) => {
    const mongodbUri = db + '/' + schema;
    mongoose.connect(mongodbUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    mongoose.connection.on('open', function() {
        console.log('Mongoose Connected Successfully!');
    });
    mongoose.connection.on('error', function(err) {
        console.log('Could not connect to mongo server!');
        return console.log(err.message);
    });
};
