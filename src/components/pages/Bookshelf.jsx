import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Book, Heart } from "lucide-react"; 
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    axios.get("https://virtual-book-house.vercel.app/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
      });
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.book_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.book_author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter
      ? book.reading_status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
    <Helmet>
      <title>Bookshelf</title>
    </Helmet>
      <h2 className="mt-20 mb-4 text-center text-3xl text-black font-bold">📚 Books For You</h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 px-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-60 px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Reading Status</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Want-to-Read">Want-to-Read</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredBooks.map((book) => (
          <Link key={book._id} to={`/viewDetails/${book._id}`}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 w-full max-w-sm mx-auto"
            >
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-full h-72 object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-gray-800">{book.book_title}</h3>
                <p className="text-sm text-gray-600">By {book.book_author}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                    {book.book_category}
                  </span>
                  <div className="flex items-center gap-1 text-teal-500 font-semibold">
                    <Heart size={16} className="fill-teal-400" />
                    {book.upvote}
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Bookshelf;
