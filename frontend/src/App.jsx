// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/verifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Patient Pages
import DoctorsList from "./pages/patient/doctorsList";
import DoctorDetails from "./pages/patient/DoctorDetails";

import MyAppointments from "./pages/patient/MyAppointments";
import PaymentPage from "./pages/patient/PaymentPage";

// Doctor Page
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ManageSchedule from "./pages/doctor/ManageSchedule";

// Admin Page

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManagePatients from "./pages/admin/ManagePatients";
import Reports from "./pages/admin/Reports";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateAdmin from "./pages/CreateAdmin";



function App() {
  return (
    <AuthProvider>
      {/* Router must wrap everything that uses Link/NavLink */}
      <Router> 
        <Navbar/>
        
        <Routes>
          {/* Public Routes */}
          <Route path="/create-admin" element={<CreateAdmin />} />
          
           
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

           
            
          {/* Patient Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute role="patient">
                <Home />
              </ProtectedRoute>
            }
            />
          <Route
            path="/doctor/:id"
            element={
              <ProtectedRoute role="patient">
                <DoctorDetails />
              </ProtectedRoute>
            }
            />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute role="patient">
                <DoctorsList />
              </ProtectedRoute>
            }
            />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute role="patient">
                <MyAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <ProtectedRoute role="patient">
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          {/* Doctor Route */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute role="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/schedule"
            element={
            <ProtectedRoute role="doctor">
            <ManageSchedule />
            </ProtectedRoute>
           }
          />

        

          {/* Admin Route */}
         
         
          
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute role="admin">
                <ManageDoctors />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/patients"
            element={
              <ProtectedRoute role="admin">
                <ManagePatients />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute role="admin">
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* Optional Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;