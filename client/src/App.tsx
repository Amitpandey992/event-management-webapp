import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import { isAuthenticated } from "./lib/auth";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventForm from "./pages/admin/EventForm";
import EntireGallery from "./pages/EntireGallery";
import Aboutus from "./pages/Aboutus";
import Payment from "./pages/Payment";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Public routes */}
        <Route
          path="/*"
          element={
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/Event-form" element={<EventForm />} />
              <Route path="/ourgallery" element={<EntireGallery />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
