import express from 'express';
import { PORT , mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookmodel.js';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome!');
});

//Route for Save a new book
app.post('/book', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.year
        ) {
            return response.status(400).send({
                 message: 'Please fill all required fields' 
                });
        }
        const newBook= {
            title: request.body.title,
            author: request.body.author,
            year: request.body.year,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch(error) {
        console.log('There is an error', error);
        return response.status(500).send({ message: error.message });
    }
});
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

