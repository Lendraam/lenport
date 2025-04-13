"use client";

import { useState, useEffect } from "react";
import { db, ref, set, push, get } from "../lib/firebase";

export default function RatingPage() {
  const [userRating, setUserRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [averageRating, setAverageRating] = useState(null);
  const [ratingHistory, setRatingHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const submitRating = async () => {
    if (userRating < 1 || userRating > 5 || !userName.trim()) {
      setStatusMessage("Please provide a valid name and rating between 1 and 5.");
      return;
    }
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const ratingRef = ref(db, "ratings");
      const newRatingKey = push(ratingRef).key;
      await set(ref(db, `ratings/${newRatingKey}`), {
        name: userName,
        rating: userRating,
        timestamp: Date.now(),
      });

      setStatusMessage("Thank you for your rating!");
      setUserRating(0);
      setUserName("");
      fetchAverageRating();
      fetchRatingHistory();
    } catch (error) {
      setStatusMessage("Error submitting rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchAverageRating = async () => {
    const ratingsRef = ref(db, "ratings");
    try {
      const snapshot = await get(ratingsRef);
      if (snapshot.exists()) {
        const ratings = snapshot.val();
        const ratingValues = Object.values(ratings);
        const average =
          ratingValues.reduce((sum, rating) => sum + rating.rating, 0) /
          ratingValues.length;
        setAverageRating(average.toFixed(2));
      }
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  const fetchRatingHistory = async () => {
    const ratingsRef = ref(db, "ratings");
    try {
      const snapshot = await get(ratingsRef);
      if (snapshot.exists()) {
        const ratings = snapshot.val();
        const history = Object.values(ratings);
        // Mengurutkan komentar berdasarkan timestamp dari terbaru ke yang lama
        history.sort((a, b) => b.timestamp - a.timestamp);
        setRatingHistory(history);
      }
    } catch (error) {
      console.error("Error fetching rating history:", error);
    }
  };

  useEffect(() => {
    fetchAverageRating();
    fetchRatingHistory();
  }, []);

  const getEmote = (rating) => {
    if (rating === 1) return "😞";
    if (rating === 2) return "😟";
    if (rating === 3) return "😐";
    if (rating === 4) return "🙂";
    if (rating === 5) return "😁";
    return "🤔";
  };

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Rate This Website</h2>

      <div className="w-full max-w-md sm:max-w-lg mx-auto p-6 sm:p-8 rounded-xl shadow-lg space-y-6" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}>
        <h3 className="text-xl font-semibold mb-2">Please rate your experience:</h3>

        <div>
          <label htmlFor="name" className="block text-sm font-medium" style={{ color: "var(--muted)" }}>
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mt-2 p-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: "var(--background)", color: "var(--foreground)", borderColor: "var(--muted)" }}
            required
          />
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            <button
              key={ratingValue}
              onClick={() => setUserRating(ratingValue)}
              className={`p-2 sm:p-3 rounded-full ${userRating >= ratingValue ? "bg-yellow-400" : "bg-gray-300"} hover:bg-yellow-500 transition-all`}
            >
              <span className="text-2xl sm:text-3xl">{getEmote(ratingValue)}</span>
              <div className="text-lg sm:text-xl mt-1">★</div>
            </button>
          ))}
        </div>

        {statusMessage && (
          <p className="text-center text-sm font-medium" style={{ color: statusMessage.includes("Thank you") ? "green" : "red" }}>
            {statusMessage}
          </p>
        )}

        <button
          onClick={submitRating}
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Rating"}
        </button>

        {averageRating && (
          <div className="pt-4 border-t text-center" style={{ borderColor: "var(--muted)" }}>
            <h4 className="text-base font-semibold" style={{ color: "var(--muted)" }}>
              Average Rating:
            </h4>
            <p className="text-xl font-bold text-blue-600">{averageRating} / 5</p>
          </div>
        )}

        <div className="pt-6 border-t" style={{ borderColor: "var(--muted)" }}>
          <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--muted)" }}>
            Rating History:
          </h4>
          <ul className="space-y-3 max-h-[300px] overflow-y-auto">
            {ratingHistory.length > 0 ? (
              ratingHistory.map((rating, index) => (
                <li
                  key={index}
                  className="p-3 border rounded-lg"
                  style={{ borderColor: "var(--muted)", backgroundColor: "var(--background)" }}
                >
                  <p className="font-semibold">{rating.name}</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="text-lg"
                        style={{ color: star <= rating.rating ? "gold" : "lightgray" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {new Date(rating.timestamp).toLocaleString()}
                  </p>
                </li>
              ))
            ) : (
              <p style={{ color: "var(--muted)", textAlign: "center" }}>
                No ratings yet.
              </p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
