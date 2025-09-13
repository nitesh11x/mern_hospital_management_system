import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ShowPatient = () => {
  const { patient, deletePatientById, isAdminAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const res = patient?.patient || [];

  const [search, setSearch] = useState("");

  // Filter patients based on search
  const filteredPatients = res.filter(
    (pat) =>
      pat.firstName.toLowerCase().includes(search.toLowerCase()) ||
      pat.lastName.toLowerCase().includes(search.toLowerCase()) ||
      pat.email.toLowerCase().includes(search.toLowerCase()) ||
      pat.phone.includes(search)
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      deletePatientById(id);
    }
  };

  return (
    <>
      {isAdminAuth && (
        <section className="mt-20 w-full min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">
              All Patients
            </h1>

            {/* Search bar */}
            <div className="flex justify-center mb-8 gap-3">
              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => setSearch(search)}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
              >
                Search
              </button>
            </div>

            {filteredPatients.length === 0 ? (
              <p className="text-center text-gray-600">No patients found.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPatients.map((pat) => (
                  <div
                    key={pat._id}
                    className="bg-white shadow-md rounded-md p-6 hover:shadow-xl transition"
                  >
                    <h2 className="text-xl font-semibold text-purple-700 mb-2">
                      {pat.firstName} {pat.lastName}
                    </h2>
                    <p className="text-gray-700">
                      <strong>Email:</strong> {pat.email}
                    </p>
                    <p className="text-gray-700">
                      <strong>Phone:</strong> {pat.phone}
                    </p>
                    <p className="text-gray-700">
                      <strong>Gender:</strong> {pat.gender}
                    </p>
                    <p className="text-gray-700">
                      <strong>DOB:</strong>{" "}
                      {new Date(pat.dob).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`${
                          pat.status === "Accepted"
                            ? "text-green-600"
                            : pat.status === "Pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        } font-medium`}
                      >
                        {pat.status}
                      </span>
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() =>
                          navigate(`/user/patient/update/${pat._id}`)
                        }
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(pat._id)}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ShowPatient;
