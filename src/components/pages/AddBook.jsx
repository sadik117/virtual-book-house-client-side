import React, { useContext, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    book_title: "",
    cover_photo: "",
    total_page: "",
    book_author: "",
    book_category: "Fiction",
    reading_status: "Want-to-Read",
    book_overview: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      ...formData,
      user_email: user?.email,
      user_name: user?.displayName,
      upvote: 0
    };

    try {
      await axios.post("https://virtual-book-house.vercel.app/books", newBook);
      toast.success("✅ Book added successfully!");
      navigate("/my-books");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add book.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-full mx-auto p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl mt-10"
    >

      <Helmet>
        <title>Add Book</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center text-teal-500">
        📚 Add a New Book
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <input
          name="book_title"
          value={formData.book_title}
          onChange={handleChange}
          required
          placeholder="Book Title"
          className="input input-bordered bg-gray-700 text-white border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 p-1 rounded-md"
        />
        <input
          name="cover_photo"
          value={formData.cover_photo}
          onChange={handleChange}
          required
          placeholder="Cover Photo URL"
          className="input input-bordered bg-gray-700 text-white border-teal-500 p-1 rounded-md"
        />
        <input
          name="total_page"
          value={formData.total_page}
          onChange={handleChange}
          required
          type="number"
          placeholder="Total Pages"
          className="input input-bordered bg-gray-700 text-white border-teal-500 p-1 rounded-md"
        />
        <input
          name="book_author"
          value={formData.book_author}
          onChange={handleChange}
          required
          placeholder="Author Name"
          className="input input-bordered bg-gray-700 text-white border-teal-500 p-1 rounded-md"
        />

        <input
          value={user?.email}
          readOnly
          className="input input-bordered bg-gray-700 text-gray-400 cursor-not-allowed border-teal-500 p-1 rounded-md"
        />
        <input
          value={user?.displayName}
          readOnly
          className="input input-bordered bg-gray-700 text-gray-400 cursor-not-allowed border-teal-500 p-1 rounded-md"
        />

        <select
          name="book_category"
          value={formData.book_category}
          onChange={handleChange}
          className="select select-bordered bg-gray-700 text-white border-teal-500 p-1 rounded-md"
        >
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Fantasy</option>
          <option>Self-Help</option>
          <option>Poetry</option>
        </select>

        <select
          name="reading_status"
          value={formData.reading_status}
          onChange={handleChange}
          className="select select-bordered bg-gray-700 text-white border-teal-500 p-1 rounded-md"
        >
          <option>Read</option>
          <option>Reading</option>
          <option>Want-to-Read</option>
        </select>

        <textarea
          name="book_overview"
          value={formData.book_overview}
          onChange={handleChange}
          placeholder="Book Overview"
          className="textarea textarea-bordered bg-gray-700 text-white border-teal-500 p-1 rounded-md"
        />

        <input
          value="0"
          readOnly
          className="input input-bordered bg-gray-700 text-gray-400 cursor-not-allowed border-teal-500 p-1 rounded-md"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold"
        >
          🚀 Add Book
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddBook;
