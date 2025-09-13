import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./components/commonComponents/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/commonComponents/Footer";

import DoctorLogin from "./components/doctorComponents/DoctorLogin";
import DoctorRegister from "./components/doctorComponents/DoctorRegister";
import DoctorAbout from "./components/doctorComponents/DoctorAbout";
import DoctorDashboard from "./components/doctorComponents/DoctorDashboard";
import DoctorEdit from "./components/doctorComponents/DoctorEdit";

import ShowAdmin from "./components/adminComponents/ShowAdmin";
import AdminRegister from "./components/adminComponents/AdminRegister";
import AdminLogin from "./components/adminComponents/AdminLogin";
import AdminDashboard from "./components/adminComponents/AdminDashboard";
import AdminEdit from "./components/adminComponents/AdminEdit";

import PatientEdit from "./components/patientComponents/PatientEdit";
import PatientRegister from "./components/patientComponents/PatientRegister";
import PatientLogin from "./components/patientComponents/PatientLogin";
import PatientProfile from "./components/patientComponents/PatientProfile";

import SendAppointment from "./components/appoinementComponents/SendAppointment";
import ShowAppointments from "./components/appoinementComponents/ShowAppointments";
import Doctors from "./pages/Doctors";
import Dashboard from "./pages/Dashboard";
import AllReviews from "./components/reviewComponents/AllReviews";
import PostReview from "./components/reviewComponents/PostReview";
import DoctorProfile from "./components/doctorComponents/DoctorProfile";
import AdminProfile from "./components/adminComponents/AdminProfile";
import ShowPatient from "./components/patientComponents/ShowPatient";
import LearnMore from "./pages/LearnMore";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/more" element={<LearnMore />}></Route>

          <Route path="/hospital" element={<Dashboard />}></Route>

          <Route path="/appointment" element={<ShowAppointments />}></Route>
          <Route path="/appointment/send" element={<SendAppointment />}></Route>

          <Route path="/reviews/" element={<AllReviews />}></Route>
          <Route path="/review/post" element={<PostReview />}></Route>

          <Route path="/patient/all" element={<ShowPatient />}></Route>
          <Route path="/patient/profile" element={<PatientProfile />}></Route>
          <Route path="/patient/login" element={<PatientLogin />}></Route>
          <Route path="/patient/register" element={<PatientRegister />}></Route>
          <Route path="/patient/edit/:id" element={<PatientEdit />}></Route>

          <Route path="/user/admin/" element={<ShowAdmin />}></Route>
          <Route path="/user/admin/:id" element={<AdminProfile />}></Route>
          <Route path="/user/admin/login" element={<AdminLogin />}></Route>
          <Route
            path="/user/admin/register"
            element={<AdminRegister />}
          ></Route>
          <Route
            path="/user/admin/dashboard"
            element={<AdminDashboard />}
          ></Route>
          <Route path="/user/admin/edit/:id" element={<AdminEdit />}></Route>

          <Route path="/user/doctor" element={<Doctors />}></Route>
          <Route path="/user/doctor/login" element={<DoctorLogin />}></Route>
          <Route
            path="/user/doctor/register"
            element={<DoctorRegister />}
          ></Route>
          <Route path="/user/doctor/about" element={<DoctorAbout />}></Route>
          <Route path="/user/doctor/:id" element={<DoctorProfile />}></Route>
          <Route path="/user/doctor/about/:id" element={<DoctorAbout />}></Route>
          <Route path="/user/doctor/edit/:id" element={<DoctorEdit />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
