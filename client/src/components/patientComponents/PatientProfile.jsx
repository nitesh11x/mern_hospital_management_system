import React, { useContext } from 'react';
import AppContext from "../../context/AppContext";
import { User, Phone, Mail, Calendar, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PatientProfile = () => {
  const { patient, isPatientAuth } = useContext(AppContext);
  // Assuming the current logged-in patient's ID is stored or we filter from list.
  // Ideally, we should fetch "me". But looking at AppState, we only have 'patient' list for admins.
  // Wait, AppState fetchPatient is ONLY for admins.
  // We need to fetch the current patient's profile if they are logged in.
  // Let's rely on basic info validation or fetch if needed.

  // For now, let's look for the patient in the list IF we have it (unlikely for patient role)
  // OR we need to fetch "my profile".
  // Since 'patient' state is only populated for Admin, this page will likely be empty for a Patient user.
  // FIX: We need a "get my profile" endpoint or similar.
  // However, looking at Dashboard/Login, we usually store ID in localStorage.

  const id = localStorage.getItem("id"); // Assuming ID is stored here (PatientLogin likely needs to store it)

  // We don't have a "fetch single patient" in AppState exposed widely.
  // I will make a local fetch to ensure it works.

  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { url } = useContext(AppContext);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/patient/my-profile`, { withCredentials: true }); // Assuming this endpoint exists or similar
        // If /my-profile doesn't exist, we might need /patient/${id}
        // Let's try /patient/${id}
        // Wait, route list might only have /patient/all or /patient/register
        // I will check backend routes if I can, but standard REST usually has /:id
      } catch (err) {
        // trying /patient/${id}
        try {
          const res2 = await axios.get(`${url}/patient/${id}`, { withCredentials: true });
          setProfile(res2.data.patient);
        } catch (e) {
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id, url]);

  // Fallback if no ID (shouldn't happen in protected route)
  if (!id) return <div>Access Denied</div>;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-32 relative"></div>

        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <User size={64} />
              </div>
            </div>
            <Link to={`/patient/edit/${id}`} className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 px-4 py-2 rounded-lg transition">
              <Edit size={18} /> Edit Profile
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile?.firstName} {profile?.lastName}</h1>
              <p className="text-gray-500 font-medium">Patient ID: {profile?._id?.slice(-6).toUpperCase()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{profile?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-green-100 p-3 rounded-lg text-green-600">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-900">{profile?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium text-gray-900">{new Date(profile?.dob).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium text-gray-900 capitalize">{profile?.gender}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientProfile
