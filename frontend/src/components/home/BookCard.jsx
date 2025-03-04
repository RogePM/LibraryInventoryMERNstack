import { Link } from 'react-router-dom';
import { PiBookOpenTextLight} from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit} from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BookCard = ( {books}) => {
  return (
    <div className = 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {books.map((item) => (
            <div key={item._id} 
            className='border-2 border-sky-400 rounded-xl p-4 py-2 m-4 relative hover:shadow-lg'
            >
            <h2 className = ' border-2 top-2 right-2 px-4 py-1 bg-red-300 rounded-lg text-white absolute'>
                {item.year}
            </h2>     
            <h4 className='my-2 text-gray-500'>{item._id}</h4>
            <div className='flex justify-between items-center gap-x-2'>
                <PiBookOpenTextLight className='text-red-300 text-2x1' />
                <h2 className = 'my-1'> {item.title} </h2>
            </div>
            <div className='flex justify-between items-center gap-x-2'>
                <BiUserCircle className='text-red-300 text-2x1' />
                <h2 className = 'my-1'> {item.author} </h2> 
            </div>
            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                <Link to={`/books/details/${item._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                </Link>
                <Link to={`/books/edit/${item._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-800 hover:text-black' />
                </Link>
                <Link to={`/books/delete/${item._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-800 hover:text-black' />
                </Link>
            </div>
        </div>
          ))}
      
    </div>
  )
}

export default BookCard
