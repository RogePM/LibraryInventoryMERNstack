import mongoose from "mongoose";

const bookSchema = new mongoose.Schema();


export const Book = mongoose.model('Book', bookSchema);