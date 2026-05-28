import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreateListing from "./pages/farmer/CreateListing.jsx";
import MyListings from "./pages/farmer/MyListings.jsx";
import BrowseListings from "./pages/vendor/BrowseListings.jsx";
import MyOrders from "./pages/vendor/MyOrders.jsx";
import ReceivedOrders from "./pages/farmer/RecievedOrders.jsx";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";

export default function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
          <Route path="/vendor/browseListings" element={
            <ProtectedRoute>
              <BrowseListings />
            </ProtectedRoute>
          } />
          <Route path="/vendor/myOrders" element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } />
          <Route
            path="/farmer/orders"
            element={
              <ProtectedRoute>
                <ReceivedOrders />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
    </>
  );
}