import React, { useState, useEffect, use } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5556/books/${id}`)
      .then((response) => {
        setTitle(response.data.title)
        setAuthor(response.data.author)
        setYear(response.data.year)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      });
  }, []);
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      year,
    };
    setLoading(true);
    axios
      .put(`http://localhost:9000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-sky-400 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-sky-400 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Publish Year</label>
          <input
            type='number'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='border-2 border-sky-400 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditBook
