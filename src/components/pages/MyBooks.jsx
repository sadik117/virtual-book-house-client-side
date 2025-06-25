import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";
import { Heart, Pencil, Trash } from "lucide-react";
import { Helmet } from "react-helmet-async";

const MySwal = withReactContent(Swal);

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      if (user?.email) {
        const token = await user.getIdToken();

        const res = await fetch(
          `https://virtual-book-house.vercel.app/my-books?email=${user.email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setBooks(data);
      }
    };

    fetchBooks();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "This will delete the book permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await fetch(`https://virtual-book-house.vercel.app/books/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Book deleted successfully!");
        setBooks((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error("Failed to delete book.");
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedBook = {
      book_title: form.book_title.value,
      book_author: form.book_author.value,
      cover_photo: form.cover_photo.value,
      total_page: form.total_page.value,
      book_category: form.book_category.value,
      reading_status: form.reading_status.value,
      book_overview: form.book_overview.value,
    };

    const res = await fetch(`https://virtual-book-house.vercel.app/books/${editingBook._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    if (res.ok) {
      const updated = await res.json();
      setBooks((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
      setShowModal(false);
      setEditingBook(null);
      toast.success("Book updated successfully!");
    } else {
      toast.error("Failed to update book.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">

      <Helmet>
        <title>My Books</title>
      </Helmet>

      <h2 className="mt-20 mb-8 text-center text-3xl font-bold text-black dark:text-white">
        📚 My Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <motion.div
            key={book._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 w-full max-w-sm mx-auto"
          >
            <img
              src={book.cover_photo}
              alt={book.book_title || "No Title"}
              className="w-full h-72 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {book.book_title || "Untitled"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                By {book.book_author || "Unknown Author"}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                  {book.book_category || "Uncategorized"}
                </span>
                <div className="flex items-center gap-1 text-teal-500 font-semibold">
                  <Heart size={16} className="fill-teal-400" />
                  {book.upvote}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingBook(book);
                    setShowModal(true);
                  }}
                  className="btn btn-sm p-1 rounded-sm bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  <Pencil className="ml-4" size={16} /> Update
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn btn-sm p-1 rounded-sm bg-red-600 text-white hover:bg-red-700"
                >
                  <Trash className="ml-4" size={16} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-100 dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Update Book</h2>
            <form onSubmit={handleUpdateSubmit} className="grid gap-3">
              <input
                name="book_title"
                defaultValue={editingBook.book_title}
                className="input input-bordered"
              />
              <input
                name="book_author"
                defaultValue={editingBook.book_author}
                className="input input-bordered"
              />
              <input
                name="cover_photo"
                defaultValue={editingBook.cover_photo}
                className="input input-bordered"
              />
              <input
                name="total_page"
                type="number"
                defaultValue={editingBook.total_page}
                className="input input-bordered"
              />
              <select
                name="book_category"
                defaultValue={editingBook.book_category}
                className="select select-bordered"
              >
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Fantasy</option>
                <option>Poetry</option>
                <option>Self-Help</option>
              </select>
              <select
                name="reading_status"
                defaultValue={editingBook.reading_status}
                className="select select-bordered"
              >
                <option>Read</option>
                <option>Reading</option>
                <option>Want-to-Read</option>
              </select>
              <textarea
                name="book_overview"
                defaultValue={editingBook.book_overview}
                className="textarea textarea-bordered"
              />
              <div className="flex justify-end gap-3 mt-2">
                <button type="submit" className="btn btn-success btn-sm">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
