import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';
import { Book } from './models/bookmodel.js';

const app = express();
//middleware for parsing json data
app.use(express.json());

//middleware for handling CORS Policy 
//Option 1: allow origins with default of cors(*)
app.use(cors());
//Option 2: allow origins with specific origins
//  app.use(
//      cors({
//          origin: 'http://localhost:3000',
//          methods: ['GET', 'POST', 'PUT', 'DELETE'],
//          allowedHeaders: ['Content-Type'],
//      })
//  );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome!');
});

app.use('/books', bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('THeres an error', error);
    });


