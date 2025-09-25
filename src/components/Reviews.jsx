import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShopContext } from "../contexts/ShopContext";

const Reviews = ({ productId }) => {
  const { backendUrl, token, user } = useContext(ShopContext); // ✅ include user

  console.log("user:", user);
  console.log("token:", token);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch reviews
  useEffect(() => {
    if (!productId) return;
    fetch(`${backendUrl}api/reviews/${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data || [])) // expect array from backend
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, [backendUrl, productId]);

  // ✅ Submit review (only logged-in users can do this)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${backendUrl}api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          ...newReview,
          product: productId, // ✅ attach product id
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setReviews([data, ...reviews]); // add new review
        setNewReview({ rating: 5, comment: "" });
      } else {
        console.error("Failed to add review:", data.message);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>

      {/* ✅ Show review form only if user is logged in */}
      {user && token ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="font-medium">Rating:</label>
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
              className="border rounded px-2 py-1"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            placeholder="Write your review..."
            className="w-full border rounded-lg p-2 text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <p className="text-gray-500 italic">Please login to write a review.</p>
      )}

      {/* ✅ Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((review, index) => (
          <motion.div
            key={review._id || index}
            className="bg-gray-50 border rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-900">
                {review.user?.name || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>
            <div className="flex items-center mt-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.168 3.602a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.158 2.293a1 1 0 00-.364 1.118l1.168 3.602c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.158 2.293c-.784.57-1.838-.197-1.539-1.118l1.168-3.602a1 1 0 00-.364-1.118L2.95 9.029c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.95-.69l1.168-3.602z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default Reviews;
