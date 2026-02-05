import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../../context/AppContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { isPatientAuth, isDoctorAuth, isAdminAuth } = useContext(AppContext);

    const isAuthenticated =
        (allowedRoles.includes("Patient") && isPatientAuth) ||
        (allowedRoles.includes("Doctor") && isDoctorAuth) ||
        (allowedRoles.includes("Admin") && isAdminAuth);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
