import express from 'express';
import { Book } from  '../models/bookmodel.js';

const router = express.Router();

//Route for Save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.year
        ) {
            return response.status(400).send({
                message: 'Please fill all required fields'
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            year: request.body.year,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log('There is an error', error);
        return response.status(500).send({ message: error.message });
    }
});
//Route for get one book from database by id
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route for Get all books from database

router.get('/', async (request, response) => { 
    try {
        const books = await Book.find(); // Fix: use find() to get all books
        
        return response.status(200).json({
            count: books.length,
            data: books,
          });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
//Route for deleting a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
//route for update a book 
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.year
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, Year',
            });
        }


        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;