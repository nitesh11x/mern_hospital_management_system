import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Mail, Phone, Calendar, User, ShieldCheck } from "lucide-react";

const AdminProfile = () => {
  const { admin, deleteAdminById } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ find admin by id
  const currAdmin = admin?.admin?.find((data) => data._id === id);

  if (!currAdmin) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
          <h1 className="text-red-500 font-bold text-2xl mb-4">Admin Not Found</h1>
          <button onClick={() => navigate(-1)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Go Back</button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/user/admin/edit/${currAdmin._id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      deleteAdminById(id);
      navigate("/user/admin/dashboard"); // Redirect after delete
    }
  };

  return (
    <section className="min-h-screen bg-[url('/hero.jpg')] bg-cover bg-center relative bg-fixed flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/50 shadow-lg bg-gray-200">
              <img
                src="/admin-avatar.png"
                alt="Admin"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full border-4 border-gray-800 text-white shadow-sm">
              <ShieldCheck size={20} />
            </div>
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white tracking-tight">
            {currAdmin.firstName} {currAdmin.lastName}
          </h2>
          <p className="text-blue-300 font-medium text-lg mt-1">{currAdmin.role}</p>
          <span
            className={`mt-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-white/10 ${currAdmin.status === "Accepted"
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-red-500/20 text-red-300"
              }`}
          >
            {currAdmin.status}
          </span>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-white">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition">
            <div className="flex items-center gap-3 mb-1">
              <Mail size={18} className="text-blue-400" />
              <p className="text-xs text-gray-400 uppercase font-semibold">Email</p>
            </div>
            <p className="text-lg font-medium pl-8 break-all">{currAdmin.email}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition">
            <div className="flex items-center gap-3 mb-1">
              <Phone size={18} className="text-purple-400" />
              <p className="text-xs text-gray-400 uppercase font-semibold">Phone</p>
            </div>
            <p className="text-lg font-medium pl-8">{currAdmin.phone}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition">
            <div className="flex items-center gap-3 mb-1">
              <User size={18} className="text-pink-400" />
              <p className="text-xs text-gray-400 uppercase font-semibold">Gender</p>
            </div>
            <p className="text-lg font-medium pl-8 capitalize">{currAdmin.gender}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition">
            <div className="flex items-center gap-3 mb-1">
              <Calendar size={18} className="text-amber-400" />
              <p className="text-xs text-gray-400 uppercase font-semibold">Date of Birth</p>
            </div>
            <p className="text-lg font-medium pl-8">
              {new Date(currAdmin.dob).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 border-t border-white/10 pt-8">
          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            <Pencil size={18} /> Edit Profile
          </button>
          <button
            onClick={() => handleDelete(currAdmin._id)}
            className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 px-8 py-3 rounded-xl font-semibold transition"
          >
            <Trash2 size={18} /> Delete Admin
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
