"use client";

import { useState, useEffect } from "react";
import { db, ref, set, push, get } from "../lib/firebase";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState([]);

  // Mengambil komentar dan mengurutkan berdasarkan timestamp
  const fetchComments = async () => {
    const commentsRef = ref(db, "comments");
    try {
      const snapshot = await get(commentsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const commentList = Object.values(data);
        // Mengurutkan komentar berdasarkan timestamp dari terbaru ke yang lama
        commentList.sort((a, b) => b.timestamp - a.timestamp);
        setComments(commentList);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const newCommentRef = push(ref(db, "comments"));
      await set(newCommentRef, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: Date.now(),
      });

      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      fetchComments();
    } catch (error) {
      setStatus("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="min-h-screen py-12 px-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-10"
        style={{ color: "var(--text-main)" }}
      >
        Contact Me
      </h2>

      <div
        className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium"
              style={{ color: "var(--text-main)" }}
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-main)",
                borderColor: "#cbd5e1",
              }}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: "var(--text-main)" }}
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-main)",
                borderColor: "#cbd5e1",
              }}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium"
              style={{ color: "var(--text-main)" }}
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-main)",
                borderColor: "#cbd5e1",
              }}
              required
            ></textarea>
          </div>

          {status && (
            <p
              className={`text-center text-sm font-medium mb-4 ${
                status.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Komentar */}
      <div className="max-w-2xl mx-auto mt-12">
        <h3
          className="text-2xl font-semibold mb-4"
          style={{ color: "var(--text-main)" }}
        >
          Komentar Web
        </h3>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "#cbd5e1",
                }}
              >
                <p style={{ color: "var(--text-main)" }}>{comment.name}</p>
                <p style={{ color: "var(--text-secondary)" }}>{comment.email}</p>
                <p style={{ color: "var(--text-main)", marginTop: "0.5rem" }}>
                  {comment.message}
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {new Date(comment.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center" style={{ color: "var(--text-secondary)" }}>
              No messages yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
