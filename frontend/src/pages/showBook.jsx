import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';


const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 classname='text-3xl my-4'> Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 Text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 Text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 Text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 Text-gray-500'> Publish Year</span>
            <span>{book.year}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 Text-gray-500'>Created Time</span>
            <span>{new Date(book.createAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 Text-gray-500'>Updated Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          
          </div>
        </div>
      )}
    </div>

  );

};


export default ShowBook
