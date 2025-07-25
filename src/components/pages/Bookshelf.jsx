import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../Shared/BookCard";
import { Helmet } from "react-helmet-async";

const Bookshelf = () => {
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

  // Unique categories for filter dropdown
  const categories = [
    "All",
    ...new Set(books.map((book) => book.book_category)),
  ];

  // Handle filtering, search, and sort
  useEffect(() => {
    let filtered = [...books];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.book_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (book) => book.book_category === categoryFilter
      );
    }

    // Sort
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
        <title>Bookshelf</title>
      </Helmet>
      <h2 className="text-3xl font-semibold mb-8 mt-20 text-center">📚 Bookshelf</h2>
      <div className="w-[95%] max-w-7xl mx-auto my-10">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 justify-between">
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

        {/* Book Grid */}
        {displayBooks.length === 0 ? (
          <p className="text-center text-gray-500">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Bookshelf;
