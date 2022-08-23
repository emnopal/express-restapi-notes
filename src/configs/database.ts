import {db, schema} from './environment';

export const mongodbConnection: any = (mongoose: any) => {
    const mongodbUri: string = db + '/' + schema;

    mongoose.connect(mongodbUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    mongoose.connection.on('open', function() {
        console.log('Mongoose Connected Successfully!');
    });

    mongoose.connection.on('error', function(err: any) {
        console.log('Could not connect to mongo server!');
        return console.log(err.message);
    });
};
