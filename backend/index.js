import express from 'express';
import { PORT , mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bookRoute from './routes/bookRoute.js';
import { Book } from './models/bookmodel.js';

const app = express();
//middleware
app.use(express.json()); 

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome!');
}); 

app.use('/books', bookRoute);

mongoose
.connect (mongoDBURL) 
.then(() => {
    console.log('App is connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
})
.catch((error) => {
    console.log('THeres an error',error);
});

