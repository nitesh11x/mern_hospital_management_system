import React, { useState, useEffect, useContext } from "react";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const { isPatientAuth, reviews, isAdminAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const feedBacks = reviews?.feedbacks || [];

  // Auto-play carousel
  useEffect(() => {
    if (feedBacks.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % feedBacks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [feedBacks]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % feedBacks.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + feedBacks.length) % feedBacks.length);

  return (
    <section className="w-full bg-purple-50 py-16" id="reviews">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">
          Patient Reviews
        </h2>

        {/* Review Card Carousel */}
        {feedBacks.length > 0 ? (
          <div className="relative max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={feedBacks[current]._id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg rounded-xl p-8 flex flex-col justify-between relative"
              >
                <Quote className="w-10 h-10 text-purple-600 mb-6 mx-auto" />

                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  {feedBacks[current].message ||
                    feedBacks[current].review ||
                    "No content"}
                </p>
                <p className="font-semibold text-purple-900">
                  {feedBacks[current].firstName} {feedBacks[current].lastName}
                </p>
                <p className="font-semibold text-purple-900">
                  Email <span className="text-green-500">=&gt;&gt;</span>{" "}
                  {feedBacks[current].email}
                </p>
                <p className="font-semibold text-purple-900">
                  Posted On <span className="text-green-500">=&gt;&gt;</span>{" "}
                  {new Date(feedBacks[current].createdAt).toLocaleDateString()}
                </p>

                {/* 🗑️ Delete Button (no functionality yet) */}
                {isAdminAuth && (
                  <button
                    onClick={() => navigate("/reviews/")}
                    className="absolute top-4 right-4 cursor-pointer text-red-500 hover:text-red-700 transition"
                    title="Delete Review"
                  >
                    <Trash2 className="cursor-pointer" size={22} />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {feedBacks.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute cursor-pointer top-1/2 -left-4 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow hover:bg-purple-700"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 cursor-pointer -right-4 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow hover:bg-purple-700"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500 mt-6">No reviews available.</p>
        )}

        {/* Post Review Button */}
        <div className="mt-8">
          {isPatientAuth && (
            <button
              onClick={() => navigate("/review/post")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
            >
              <PlusCircle size={20} />
              Post a Review
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
