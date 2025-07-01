import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AllBooksTable = () => {
  const [books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    axios
      .get("https://virtual-book-house.vercel.app/books")
      .then((res) => {
        setBooks(res.data);
        setDisplayBooks(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(books.map((book) => book.book_category))];

  useEffect(() => {
    let filtered = [...books];

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.book_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter((book) => book.book_category === categoryFilter);
    }

    if (sortOption === "title") {
      filtered.sort((a, b) => a.book_title.localeCompare(b.book_title));
    } else if (sortOption === "author") {
      filtered.sort((a, b) => a.book_author.localeCompare(b.book_author));
    } else if (sortOption === "upvote") {
      filtered.sort((a, b) => b.upvote - a.upvote);
    }

    setDisplayBooks(filtered);
  }, [searchTerm, categoryFilter, sortOption, books]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-bars loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>All Books</title>
      </Helmet>

      <h2 className="text-3xl font-semibold mb-8 mt-20 text-center">📚 All Books</h2>

      <div className="w-[95%] max-w-7xl mx-auto my-10">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 justify-between">
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full md:w-1/3 border-2 rounded-lg px-2 border-purple-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered w-full md:w-1/4 rounded-lg px-2 border-2 border-purple-100"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered w-full md:w-1/4 rounded-lg px-2 border-2 border-purple-100"
          >
            <option value="">Sort By</option>
            <option value="title">Title (A–Z)</option>
            <option value="author">Author (A–Z)</option>
            <option value="upvote">Upvotes (High–Low)</option>
          </select>
        </div>

        {/* Table */}
        {displayBooks.length === 0 ? (
          <p className="text-center text-gray-500">No books found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Cover</th>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Author</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {displayBooks.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-4 py-3">
                      <img
                        src={book.cover_photo}
                        alt={book.book_title}
                        className="w-14 h-20 object-cover rounded shadow"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium max-w-[180px] truncate" title={book.book_title}>
                      {book.book_title}
                    </td>
                    <td className="px-4 py-3">{book.book_author}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {book.book_category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link to={`/viewDetails/${book._id}`}>
                        <button className="btn p-1 rounded-lg btn-sm bg-purple-500 text-white hover:bg-purple-600">
                          See Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBooksTable;
