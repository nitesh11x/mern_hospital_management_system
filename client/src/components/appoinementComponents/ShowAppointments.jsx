import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";

const ShowAppointments = () => {
  const {
    appointments,
    updateAppointmentStatus,
    isAdminAuth,
    deleteAppointmentById,
  } = useContext(AppContext);
  const appointmentList = appointments?.appointments || [];

  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are You Sure to Delete This Appointment "
    );
    if (!confirmDelete) return;
    const result = await deleteAppointmentById(id);
    return result;
  };

  const handleUpdate = async (id) => {
    try {
      await updateAppointmentStatus(id, status);
      console.log("Updated:", { id, status });
      setEditingId(null);
      setStatus("");
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  // Filter appointments based on search input
  const filteredAppointments = appointmentList.filter((app) => {
    const doctorName = `${app.doctor?.firstName || ""} ${
      app.doctor?.lastName || ""
    }`;
    return (
      app.firstName.toLowerCase().includes(search.toLowerCase()) ||
      app.lastName.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.phone.includes(search) ||
      doctorName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      {!isAdminAuth && (
        <div className="text-red-600 justify-center text-center text-2xl items-center">
          Please Login as A admin
        </div>
      )}
      {isAdminAuth && (
        <section className="min-h-screen mt-18 bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200 px-4 py-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-purple-800 text-center mb-10">
              All Appointments
            </h2>

            {/* Search bar */}
            <div className="flex justify-center mb-8 gap-3">
              <input
                type="text"
                placeholder="Search appointments..."
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

            {filteredAppointments.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">
                No appointments found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAppointments.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white/95 backdrop-blur-sm rounded-sm shadow-md border border-purple-200 p-5 hover:shadow-lg transition"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-purple-700">
                        {app.firstName} {app.lastName}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-sm font-medium ${
                          app.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : app.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    {/* Patient Info */}
                    <div className="space-y-1 text-sm text-gray-700 mb-4">
                      <p>
                        <span className="font-medium text-purple-600">
                          Patient ID:
                        </span>{" "}
                        {app.patientId}
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">
                          Email:
                        </span>{" "}
                        {app.email}
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">
                          Phone:
                        </span>{" "}
                        {app.phone}
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">DOB:</span>{" "}
                        {new Date(app.dob).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">
                          Gender:
                        </span>{" "}
                        {app.gender}
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">
                          Address:
                        </span>{" "}
                        {app.address}
                      </p>
                    </div>

                    {/* Appointment Info */}
                    <div className="space-y-1 text-sm text-gray-700 mb-4">
                      <p>
                        <span className="font-medium text-purple-600">
                          Appointment Date:
                        </span>{" "}
                        {new Date(app.appointment_date).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">
                          Doctor:
                        </span>{" "}
                        {app.doctor?.firstName} {app.doctor?.lastName} (
                        {app.department})
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">
                          Has Visited Before:
                        </span>{" "}
                        {app.hasVisited ? "Yes" : "No"}
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">
                          Symptoms/Reason:
                        </span>{" "}
                        {app.symptoms || "N/A"}
                      </p>
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-1 text-sm text-gray-700 mb-4">
                      <p>
                        <span className="font-medium text-purple-600">
                          Payment Mode:
                        </span>{" "}
                        {app.paymentMode}
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">
                          Payment Status:
                        </span>{" "}
                        <span
                          className={`font-semibold ${
                            app.paymentStatus === "Paid"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {app.paymentStatus}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium text-purple-600">
                          Transaction ID:
                        </span>{" "}
                        {app.transactionId || "N/A"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center mt-3">
                      <button
                        onClick={() => setEditingId(app._id)}
                        className="px-3 py-1.5 text-sm cursor-pointer bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition"
                      >
                        Update Status
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="px-3 py-1.5 text-sm cursor-pointer bg-red-500 text-white rounded-sm hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Inline Update Form */}
                    {editingId === app._id && (
                      <div className="mt-4 border-t pt-3 space-y-2">
                        <select
                          className="w-full border rounded-sm px-2 py-1 text-sm"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Solved">Solved</option>
                        </select>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(app._id)}
                            className="flex-1 px-3 cursor-pointer py-1 text-sm bg-green-600 text-white rounded-sm hover:bg-green-700 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex-1 cursor-pointer px-3 py-1 text-sm bg-gray-400 text-white rounded-sm hover:bg-gray-500 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
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

export default ShowAppointments;
