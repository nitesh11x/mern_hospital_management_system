import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const PostReview = () => {
  const { isPatientAuth, postReview } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const [posting, setPosting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    if (!message.trim()) {
      alert("Message cannot be empty");
      return;
    }
    let res = await postReview(message);
    if (res.success) {
      navigate("/");
      setMessage("");
    }
    setPosting(false);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh] bg-gray-50 px-4">
      {!isPatientAuth && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-6 py-4 rounded-sm shadow-sm">
          Please <span className="font-semibold">Login</span> to post a review.
        </div>
      )}

      {isPatientAuth && (
        <section className="bg-white shadow-md rounded-sm p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-purple-700 mb-4 text-center">
            Post Your Review
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <input
                id="message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your review here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={posting}
              className={`w-full bg-purple-600 text-white font-medium py-2 rounded-sm shadow-sm hover:bg-purple-700 transition
                ${
                  posting
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }
                `}
            >
              Post Review
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default PostReview;
