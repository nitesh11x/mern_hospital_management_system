import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Search, Trash2, Edit, User, Phone, Mail, Calendar, Activity } from "lucide-react";

const ShowPatient = () => {
  const { patient, deletePatientById, isAdminAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const res = patient?.patient || [];
  const [search, setSearch] = useState("");

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

  if (!isAdminAuth) return null;

  return (
    <section className="min-h-screen py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-gray-500 mt-1">Manage all registered patients</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm transition"
            />
          </div>
        </div>

        {filteredPatients.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <User size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 text-center">No Patients Found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPatients.map((pat) => (
              <div
                key={pat._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-50">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {pat.firstName[0]}{pat.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                      {pat.firstName} {pat.lastName}
                    </h2>
                    <span className="text-xs text-gray-500 uppercase font-medium tracking-wide">Patient</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400 shrink-0" />
                    <span className="truncate" title={pat.email}>{pat.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400 shrink-0" />
                    <span>{pat.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={16} className="text-gray-400 shrink-0" />
                    <span>{new Date(pat.dob).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Activity size={16} className="text-gray-400 shrink-0" />
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${pat.status === "Accepted" ? "bg-green-100 text-green-700" :
                        pat.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                      }`}>
                      {pat.status || "Active"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    onClick={() => navigate(`/user/patient/update/${pat._id}`)} // Note: Check route if update exists
                    className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pat._id)}
                    className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowPatient;
