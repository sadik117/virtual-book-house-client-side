import { motion } from "framer-motion";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  const { _id, book_title, cover_photo, book_author, book_category } = book;

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col h-full">
      <img src={cover_photo} alt={book_title} className="h-48 w-full object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{book_title}</h3>
        <p className="text-sm text-gray-600 mb-1">By {book_author}</p>
        <span className="inline-block px-2 py-2 text-xs bg-purple-100 text-blue-600 rounded w-max mb-3">{book_category}</span>
        <div className="mt-auto">
          <Link to={`/viewDetails/${_id}`}>
            <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
