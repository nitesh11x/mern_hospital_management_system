import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Navbar from "./components/commonComponents/Navbar";
import Footer from "./components/commonComponents/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LearnMore from "./pages/LearnMore";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";

// Admin Components
import AdminLogin from "./components/adminComponents/AdminLogin";
import AdminRegister from "./components/adminComponents/AdminRegister";
import AdminDashboard from "./components/adminComponents/AdminDashboard";
import ShowAdmin from "./components/adminComponents/ShowAdmin";
import AdminProfile from "./components/adminComponents/AdminProfile";
import AdminEdit from "./components/adminComponents/AdminEdit";

// Doctor Components
import DoctorLogin from "./components/doctorComponents/DoctorLogin";
import DoctorRegister from "./components/doctorComponents/DoctorRegister";
import DoctorAbout from "./components/doctorComponents/DoctorAbout";
import DoctorProfile from "./components/doctorComponents/DoctorProfile";
import DoctorEdit from "./components/doctorComponents/DoctorEdit";

// Patient Components
import PatientLogin from "./components/patientComponents/PatientLogin";
import PatientRegister from "./components/patientComponents/PatientRegister";
import PatientProfile from "./components/patientComponents/PatientProfile";
import PatientEdit from "./components/patientComponents/PatientEdit";
import ShowPatient from "./components/patientComponents/ShowPatient";

// Appointment & Reviews
import SendAppointment from "./components/appoinementComponents/SendAppointment";
import ShowAppointments from "./components/appoinementComponents/ShowAppointments";
import AllReviews from "./components/reviewComponents/AllReviews";
import PostReview from "./components/reviewComponents/PostReview";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="top-center" theme="colored" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/more" element={<LearnMore />} />
          <Route path="/hospital" element={<Dashboard />} />
          <Route path="/user/doctor" element={<Doctors />} />
          <Route path="/appointment" element={<ShowAppointments />} />
          <Route path="/review/post" element={<PostReview />} />
          <Route path="/user/doctor/about/:id" element={<DoctorAbout />} />

          {/* Auth Routes */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/user/admin/login" element={<AdminLogin />} />
          <Route path="/user/doctor/login" element={<DoctorLogin />} />
          <Route path="/user/doctor/register" element={<DoctorRegister />} />
          <Route path="/user/admin/register" element={<AdminRegister />} />

          {/* Patient Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Patient"]} />}>
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/edit/:id" element={<PatientEdit />} />
            <Route path="/appointment/send" element={<SendAppointment />} />
          </Route>

          {/* Doctor Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Doctor"]} />}>
            <Route path="/user/doctor/:id" element={<DoctorProfile />} />
            <Route path="/user/doctor/edit/:id" element={<DoctorEdit />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/user/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/user/admin/" element={<ShowAdmin />} />
            <Route path="/user/admin/:id" element={<AdminProfile />} />
            <Route path="/user/admin/edit/:id" element={<AdminEdit />} />
            <Route path="/patient/all" element={<ShowPatient />} />
            <Route path="/reviews/" element={<AllReviews />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter >
    </>
  );
};

export default App;
