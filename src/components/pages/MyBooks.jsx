import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
            headers: { Authorization: `Bearer ${token}` },
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
      const res = await fetch(
        `https://virtual-book-house.vercel.app/books/${id}`,
        {
          method: "DELETE",
        }
      );

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

    const res = await fetch(
      `https://virtual-book-house.vercel.app/books/${editingBook._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      }
    );

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

      <div className="overflow-x-auto rounded-xl shadow ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-3">Cover</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Upvotes</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <img
                    src={book.cover_photo}
                    alt={book.book_title}
                    className="w-14 h-20 object-cover rounded shadow"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{book.book_title}</td>
                <td className="px-4 py-3">{book.book_author}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                    {book.book_category}
                  </span>
                </td>
                <td className="px-4 py-3">{book.reading_status}</td>
                <td className="px-4 py-3 mt-7 text-orange-800 font-semibold flex items-center gap-1">
                  <Heart size={16} className="fill-orange-800" /> {book.upvote}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingBook(book);
                        setShowModal(true);
                      }}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md w-full sm:w-auto text-white bg-teal-500 hover:bg-teal-600 transition duration-200"
                    >
                      <Pencil size={16} />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md w-full sm:w-auto text-white bg-red-600 hover:bg-red-700 transition duration-200"
                    >
                      <Trash size={16} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing */}
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
