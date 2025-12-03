import React, { useState } from "react";
import api from "@/axios/axios";

function BookReview({ bookId }) {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleViewReview = async () => {
    if (!bookId) {
      console.log("!id");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/user/reviewBookByAi", { id: bookId });
      setReview(res.data.review);
      setShowModal(true); // show popup
    } catch (error) {
      console.error("Book Review Error:", error);
      setReview("Failed to load review");
      setShowModal(true);
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleViewReview}
        className="mt-4 px-5 flex items-center justify-center gap-2 hover:bg-yellow-700 text-white py-2 rounded-xl font-semibold bg-gray-800 transition"
      >
        {!loading ? "Review" : "Loading..."}
    
      </button>


      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/5 bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl max-w-md w-11/12 relative animate-fadeIn">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-3">Book Review</h2>

            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {review}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookReview;
