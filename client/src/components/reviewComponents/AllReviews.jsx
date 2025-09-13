import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Trash2, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const AllReviews = () => {
  const { reviews, isAdminAuth, deleteReviewsById } = useContext(AppContext);
  const reviewList = reviews?.feedbacks || [];

  const handleDeleteReview = async (id) => {
    const confirmDelete = window.confirm("Are You Sure to Delete This Review ");
    if (!confirmDelete) return;
    const result = await deleteReviewsById(id);
    return result;
  };

  return (
    <>
      {!isAdminAuth && (
        <div className=" w-screen h-screen bg-red-500">
          You are not allowe to access this route
          <Link to={"/"}>Go Back</Link>
        </div>
      )}
      {isAdminAuth && (
        <section className="w-full bg-gradient-to-br mt-18 from-purple-50 via-purple-100 to-purple-200 py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 text-center mb-12">
              💜 Patient Reviews
            </h2>

            {reviewList.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {reviewList.map((rev) => (
                  <div
                    key={rev._id}
                    className="relative bg-gradient-to-br from-white via-purple-50 to-purple-100 shadow-xl rounded-sm p-6 flex flex-col border border-purple-200 hover:shadow-sm hover:scale-[1.02] transition duration-300"
                  >
                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        handleDeleteReview(rev._id), window.location.reload();
                      }}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 cursor-pointer transition"
                      title="Delete Review"
                    >
                      <Trash2 size={22} />
                    </button>

                    {/* Quote Icon */}
                    <div className="flex items-center gap-2 mb-4">
                      <Quote className="w-8 h-8 text-purple-600" />
                      <span className="text-sm font-medium text-purple-700 bg-purple-200 px-2 py-1 rounded-sm">
                        Reviews
                      </span>
                    </div>

                    {/* Review Message */}
                    <p className="text-gray-700 italic mb-6 leading-relaxed">
                      {rev.message || rev.review || "No review message"}
                    </p>

                    {/* Patient Info */}
                    <div className="mt-auto bg-purple-50 p-4 rounded-xl">
                      <p className="font-semibold text-purple-900 text-lg">
                        {rev.firstName} {rev.lastName}
                      </p>
                      <p className="text-gray-700 text-sm mb-1">{rev.email}</p>
                      <p className="text-gray-500 text-xs">
                        📅 {new Date(rev.createdAt).toLocaleDateString()}
                      </p>
                      <div className="mt-3 space-y-1 text-xs">
                        <p className="text-purple-700 font-medium">
                          Review ID:{" "}
                          <span className="text-gray-600">{rev._id}</span>
                        </p>
                        <p className="text-purple-700 font-medium">
                          Patient ID:{" "}
                          <span className="text-gray-600">{rev.patientId}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 mt-12 text-lg">
                No reviews available 💭
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default AllReviews;
