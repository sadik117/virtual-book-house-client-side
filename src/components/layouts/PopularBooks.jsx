import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../Shared/BookCard';

const PopularBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('https://virtual-book-house.vercel.app/popular-books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-[95%] max-w-7xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-8 text-center">📚 Popular Books</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default PopularBooks;
