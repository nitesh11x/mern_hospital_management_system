import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const AdminProfile = () => {
  const { admin, deleteAdminById } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ find admin by id
  const currAdmin = admin?.admin?.find((data) => data._id === id);

  if (!currAdmin) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        No Admin Found
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/admin/edit/${currAdmin._id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      console.log("Deleting admin:", currAdmin._id);
      deleteAdminById(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full border border-purple-100">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/admin-avatar.png" // replace with actual uploaded avatar if available
            alt="Admin Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-md"
          />
          <h2 className="mt-4 text-3xl font-bold text-purple-900">
            {currAdmin.firstName} {currAdmin.lastName}
          </h2>
          <p className="text-purple-600 font-medium">{currAdmin.role}</p>
          <p
            className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              currAdmin.status === "Accepted"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {currAdmin.status}
          </p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mb-8">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-lg">{currAdmin.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-lg">{currAdmin.phone}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Gender</p>
            <p className="text-lg capitalize">{currAdmin.gender}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
            <p className="text-lg">
              {new Date(currAdmin.dob).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition"
          >
            <Pencil size={18} /> Edit
          </button>
          <button
            onClick={() => handleDelete(currAdmin._id)}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
