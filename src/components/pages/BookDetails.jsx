import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";
import { HeartIcon, HeartPulse } from "lucide-react";
import { Helmet } from "react-helmet-async";

const MySwal = withReactContent(Swal);

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = await user?.getIdToken();

      const bookRes = await fetch(`https://virtual-book-house.vercel.app/books/${id}?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const bookData = await bookRes.json();
      setBook(bookData);

      const reviewRes = await fetch(`https://virtual-book-house.vercel.app/reviews?bookId=${id}`);
      const reviewData = await reviewRes.json();
      setReviews(reviewData);

      const existing = reviewData.find((r) => r.userEmail === user?.email);
      setUserReview(existing || null);
      setReviewText(existing?.comment || "");
    } catch (err) {
      console.error("Error fetching book or reviews:", err);
      toast.error("Failed to load book details.");
    }
  };

  if (user) fetchData();
}, [id, user]);


  const handleUpvote = async () => {
    if (user?.email === book.user_email) {
      toast.warn("You cannot upvote your own book.");
      return;
    }
    const res = await fetch(`https://virtual-book-house.vercel.app/books/${id}/upvote`, {
      method: "PATCH",
    });
    const data = await res.json();
    setBook(data);
    toast.success("Thanks for your upvote!");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const method = userReview ? "PATCH" : "POST";
    const endpoint = userReview
      ? `https://virtual-book-house.vercel.app/reviews/${userReview._id}`
      : `https://virtual-book-house.vercel.app/reviews`;

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: id,
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        comment: reviewText,
      }),
    });

    if (res.ok) {
      toast.success("Review submitted.");
      const updated = await res.json();
      const updatedList = userReview
        ? reviews.map((r) => (r._id === updated._id ? updated : r))
        : [...reviews, updated];
      setReviews(updatedList);
      setUserReview(updated);
    } else {
      toast.error("Failed to submit review.");
    }
  };

  const handleReviewDelete = async () => {
    const confirm = await MySwal.fire({
      title: "Delete review?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(
        `https://virtual-book-house.vercel.app/reviews/${userReview._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setReviews(reviews.filter((r) => r._id !== userReview._id));
        setUserReview(null);
        setReviewText("");
        toast.success("Review deleted.");
      }
    }
  };

  const getNextStatus = (current) => {
    if (current === "Want-to-Read") return "Reading";
    if (current === "Reading") return "Read";
    return null;
  };

  const handleStatusUpdate = async () => {
    const nextStatus = getNextStatus(book.reading_status);
    if (!nextStatus) return;

    try {
      const res = await fetch(`https://virtual-book-house.vercel.app/books/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newStatus: nextStatus,
          userEmail: user.email,
        }),
      });

      // Avoid parsing empty response
      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        const errorData =
          contentType?.includes("application/json") && (await res.json());
        throw new Error(errorData?.message || "Failed to update status");
      }

      const updated =
        contentType?.includes("application/json") && (await res.json());

      if (updated) {
        setBook(updated);
        toast.success(`Status updated to "${nextStatus}"`);
      } else {
        toast.success("Status updated.");
      }
    } catch (error) {
      toast.error(error.message || "Network error. Try again.");
    }
  };

  // Rendering logic outside of any function
  if (!book) {
    return (
      <div className="flex justify-center items-center my-20">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-100">

    <Helmet>
      <title>Book Details</title>
    </Helmet>

      <h2 className="mt-10 mb-8 text-center text-3xl text-black font-bold">
        📚 Book Details
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 mt-10 rounded-2xl shadow-md overflow-hidden mb-10"
      >
        <img
          src={book.cover_photo}
          alt={book.book_title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6 space-y-3">
          <h1 className="text-3xl font-bold">{book.book_title}</h1>
          <p className="text-blue-800 dark:text-gray-300 font-medium">
            Author: {book.book_author}
          </p>
          <p>Pages: {book.total_page}</p>
          <p>Category: {book.book_category}</p>
          <p>
            Status: <span className="font-semibold">{book.reading_status}</span>
          </p>

          {/* Reading Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-2"
          >
            <p className="font-medium mb-1">📊 Reading Progress</p>
            <div className="flex items-center gap-2">
              {["Want-to-Read", "Reading", "Read"].map((status, index) => {
                const isActive = book.reading_status === status;
                const isCompleted =
                  ["Reading", "Read"].includes(book.reading_status) &&
                  (status === "Want-to-Read" ||
                    (book.reading_status === "Read" && status === "Reading"));

                return (
                  <div key={status} className="flex items-center gap-1">
                    <div
                      className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : isCompleted
                  ? "bg-blue-300 text-white"
                  : "bg-gray-300 text-gray-700"
              }
            `}
                      title={status}
                    >
                      {index + 1}
                    </div>
                    {index < 2 && (
                      <div
                        className={`w-8 h-1 ${
                          isCompleted ? "bg-blue-400" : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {user?.email?.toLowerCase() === book?.user_email?.toLowerCase() &&
            getNextStatus(book.reading_status) && (
              <button
                onClick={handleStatusUpdate}
                className="btn btn-outline btn-sm mt-2 p-1 rounded-md bg-sky-500 text-white hover:bg-sky-600"
              >
                Mark as {getNextStatus(book.reading_status)}
              </button>
            )}

          <p>{book.book_overview}</p>
          <p>
            Added by: {book.user_name} ({book.user_email})
          </p>

          <div className="flex items-center gap-4 mt-4">
            {user && user.email !== book.user_email && (
              <button
                onClick={handleUpvote}
                className="btn flex items-center bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg gap-2"
              >
                <HeartPulse />
                <span>Upvote</span>
              </button>
            )}
            <p className="text-lg font-semibold text-teal-600 inline-flex gap-1">
              <HeartIcon className="mt-1" /> {book.upvote}{" "}
              {book.upvote === 1 ? "person" : "people"} upvoted
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4 border p-3 rounded-xl">
        <h2 className="text-2xl font-semibold">💬 Reviews</h2>

        {reviews.length === 0 && <p>No reviews yet.</p>}

        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">{r.userName}</p>
              <p className="text-sm text-gray-500">
                {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="mt-2">{r.comment}</p>
          </div>
        ))}

        {user && (
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <textarea
              className="textarea textarea-bordered w-full dark:bg-gray-900"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>
            <div className="flex gap-2">
              <button
                type="submit"
                className="btn p-1 rounded-lg bg-teal-500 text-white hover:bg-teal-600"
              >
                {userReview ? "Update Review" : "Post Review"}
              </button>
              {userReview && (
                <button
                  type="button"
                  onClick={handleReviewDelete}
                  className="btn btn-error bg-red-600 text-white hover:bg-red-700 p-1 rounded-sm"
                >
                  Delete Review
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
