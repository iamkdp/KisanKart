import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreateListing from "./pages/farmer/CreateListing.jsx";
import MyListings from "./pages/farmer/MyListings.jsx";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/farmer/createListing" element={
          <ProtectedRoute>
            <CreateListing />
          </ProtectedRoute>
        } />
        <Route path="/farmer/myListings" element={
          <ProtectedRoute>
            <MyListings />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}