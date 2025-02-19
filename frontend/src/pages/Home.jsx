import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Book List</h1>
                <Link to='/books/create' className='bg-green-500 text-white p-2 rounded-md flex items-center'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate-2'>
                    <thead>
                        <tr>
                            <th className='border-slate-600 rounded-md'> No </th>
                            <th className='border-slate-600 rounded-md'> Title </th>
                            <th className='border-slate-600 rounded-md max-md:hidden'> Author</th>
                            <th className='border-slate-600 rounded-md max-md:hidden'> Publish year</th>
                            <th className='border-slate-600 rounded-md'> Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id} className='h-8'>
                                <td className='border-slate-700 rounded-md'>{index + 1}</td>
                                <td className='border-slate-700 rounded-md'>{book.title}</td>
                                <td className='border-slate-700 rounded-md max-md:hidden'>{book.author}</td>
                                <td className='border-slate-700 rounded-md max-md:hidden'>{book.publishYear}</td>
                                <td className='border-slate-700 rounded-md'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/books/edit/${book._id}`} >
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`} >
                                            <AiOutlineEdit className='text-2xl text-red-800' />
                                        </Link>
                                        <Link to={`/books/delete/${book._id}`} >
                                            <MdOutlineDelete className='text-2xl text-yellow-800' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home
