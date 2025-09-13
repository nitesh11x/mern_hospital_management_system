import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

function AppState({ children }) {
  const [isPatientAuth, setIsPatientAuth] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [isDoctorAuth, setIsDoctorAuth] = useState(false);

  const [doctor, setDoctor] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [patient, setPatient] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const url = "http://localhost:1111/api";

  useEffect(() => {
    const storedAdminAuth = localStorage.getItem("isAdminAuth") === "true";
    const storedDoctorAuth = localStorage.getItem("isDoctorAuth") === "true";
    const storedPatientAuth = localStorage.getItem("isPatientAuth") === "true";

    setIsAdminAuth(storedAdminAuth);
    setIsDoctorAuth(storedDoctorAuth);
    setIsPatientAuth(storedPatientAuth);
  }, []);

  // 🔹 Fetch Patients
  useEffect(() => {
    if (!isAdminAuth) return;
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`${url}/patient/all`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setPatient(res.data);
        // console.log(res.data);
        

      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch patients"
        );
      }
    };
    fetchPatient();
  }, [isAdminAuth]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${url}/user/doctor/all`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setDoctor(res.data);
        // console.log(res);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctors");
      }
    };
    fetchDoctor();
  }, [isAdminAuth]);
 
  // 🔹 Fetch Admins
  useEffect(() => {
    if (!isAdminAuth) return;
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${url}/user/admin/all`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setAdmin(res.data);
        // console.log(res.data);
        
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admins");
      }
    };
    fetchAdmin();
  }, [isAdminAuth]);
  // 🔹 Fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${url}/feedBack/all`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setReviews(res.data);
        // console.log(res);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch reviews");
      }
    };
    fetchReviews();
  }, [isAdminAuth]);
  // 🔹 Fetch Appointments
  useEffect(() => {
    if (!isAdminAuth) return;
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${url}/appointment/all-appointments`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setAppointments(res.data);
        // console.log(res.data);

        // console.log(res.data.appointment.status === "Accepted");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch appointments"
        );
      }
    };
    fetchAppointments();
  }, [isAdminAuth]);
  const loginPatient = async (email, password, role) => {
    try {
      let res = await axios.post(
        `${url}/patient/login`,
        { email, password, role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsPatientAuth(true);
        localStorage.setItem("isPatientAuth", "true");
        toast.success(res.data.message);
      }
      return res;
    } catch (error) {
      toast.error(error.response?.data?.message || "Patient login failed");
    }
  };
  const loginDoctor = async (email, password, role) => {
    try {
      let res = await axios.post(
        `${url}/user/doctor/login`,
        { email, password, role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsDoctorAuth(true);
        localStorage.setItem("isDoctorAuth", "true");
        toast.success(res.data.message);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Doctor login failed");
    }
  };
  const loginAdmin = async (email, password, role) => {
    try {
      let res = await axios.post(
        `${url}/user/admin/login`,
        { email, password, role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsAdminAuth(true);
        localStorage.setItem("isAdminAuth", "true");
        toast.success(res.data.message);
      }
      return res;
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin login failed");
    }
  };
  const registerDoctor = async (formData) => {
    try {
      const response = await axios.post(
        `${url}/user/doctor/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      return response.data;
    } catch (error) {
      console.error(
        "Register doctor error:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  };
  const registerPatient = async (
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password
  ) => {
    try {
      const response = await axios.post(
        `${url}/patient/register`,
        { firstName, lastName, email, phone, dob, gender, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success) toast.success(response.data.message);
      else {
        toast.error(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error(
        "Register patient error:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  };
  const registerAdmin = async (
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password
  ) => {
    try {
      const response = await axios.post(
        `${url}/user/admin/register`,
        { firstName, lastName, email, phone, dob, gender, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success) toast.success(response.data.message);
      else {
        toast.error(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error(
        "Register admin error:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  };
  const logoutPatient = async () => {
    try {
      let res = await axios.get(`${url}/patient/logout`, {
        withCredentials: true,
      });
      setIsPatientAuth(false);
      localStorage.removeItem("isPatientAuth");
      if (res.data.success) toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Patient logout failed");
    }
  };
  const logoutDoctor = async () => {
    try {
      let res = await axios.get(`${url}/user/doctor/logout`, {
        withCredentials: true,
      });
      setIsDoctorAuth(false);
      localStorage.removeItem("isDoctorAuth");
      localStorage.removeItem("id");

      if (res.data.success) toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Doctor logout failed");
    }
  };
  const logoutAdmin = async () => {
    try {
      let res = await axios.get(`${url}/user/admin/logout`, {
        withCredentials: true,
      });
      setIsAdminAuth(false);
      localStorage.removeItem("isAdminAuth");
      if (res.data.success) toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin logout failed");
    }
  };
  const sendMessage = async (firstName, lastName, email, phone, message) => {
    try {
      const res = await axios.post(
        `${url}/message/send`,
        { firstName, lastName, email, phone, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Message sending failed");
      }
      return res;
    } catch (error) {
      toast.error(error.response?.data?.message || "Message sending failed");
    }
  };
  const deleteReviewsById = async (id) => {
    try {
      const res = await axios.delete(`${url}/feedBack/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(err.res?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };
  const deletePatientById = async (id) => {
    try {
      const res = await axios.delete(`${url}/patient/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(err.res?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };
  const deleteAdminById = async (id) => {
    try {
      const res = await axios.delete(`${url}/user/admin/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(err.res?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };
  const deleteAppointmentById = async (id) => {
    try {
      const res = await axios.delete(`${url}/appointment/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(err.res?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };
  const deleteDoctorById = async (id) => {
    try {
      const res = await axios.delete(`${url}/user/doctor/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(err.res?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };
  const postAppointment = async (
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
    paymentMode
  ) => {
    try {
      const res = await axios.post(
        `${url}/appointment/post`,
        {
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          appointment_date,
          department,
          doctor_firstName,
          doctor_lastName,
          hasVisited,
          address,
          paymentMode,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return res.data; // ✅ return only data
    } catch (error) {
      console.error(
        "Error posting appointment:",
        error.response?.data || error.message
      );
      throw error; // rethrow so component can catch
    }
  };
  const updateAppointmentStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${url}/appointment/edit/${id}`,
        {
          status,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.err(res.data.message);
    }
  };
  const postReview = async (message) => {
    try {
      const res = await axios.post(
        `${url}/feedBack/send`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("appstate", res);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.error("Error posting review:", error);
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      return { success: false, message: errMsg };
    }
  };

  return (
    <AppContext.Provider
      value={{
        isPatientAuth,
        setIsPatientAuth,
        isAdminAuth,
        setIsAdminAuth,
        isDoctorAuth,
        setIsDoctorAuth,

        admin,
        setAdmin,
        doctor,
        setDoctor,
        patient,
        setPatient,
        reviews,
        setReviews,
        appointments,
        setAppointments,

        sendMessage,

        registerAdmin,
        registerDoctor,
        registerPatient,

        loginPatient,
        loginAdmin,
        loginDoctor,

        logoutDoctor,
        logoutAdmin,
        logoutPatient,

        deleteReviewsById,
        deleteAdminById,
        deletePatientById,
        deleteAppointmentById,
        deleteDoctorById,

        postAppointment,
        updateAppointmentStatus,
        postReview,
      }}
    >
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
}

export default AppState;
