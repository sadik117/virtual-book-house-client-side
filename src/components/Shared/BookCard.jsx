import { motion } from "framer-motion";
import { Heart} from "lucide-react";
import { Link } from "react-router";

 const BookCard = ({ book }) => {
  const { book_title, cover_photo, book_author, book_category, upvote } = book;

  return (
  <Link to={`/viewDetails/${book._id}`}>
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 w-full max-w-sm mx-auto"
    >
      <img
        src={cover_photo}
        alt={book_title}
        className="w-full h-80 object-cover"
      />
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold text-gray-800">{book_title}</h3>
        <p className="text-sm text-gray-600">By {book_author}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
            {book_category}
          </span>
          <div className="flex items-center gap-1 text-teal-500 font-semibold">
            <Heart size={16} className="fill-teal-400" />
            {upvote}
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
  );
}

export default BookCard
