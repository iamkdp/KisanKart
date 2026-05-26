import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
export default function Dashboard() {
    const { user, logout } = useAuth();
    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">

                <div className="flex justify-between items-center mb-6">

                    <div>

                        <h1 className="text-3xl font-bold text-green-700">

                            Welcome, {user.name}

                        </h1>
{/* 
                        <p className="text-gray-600">

                            Role: {user.role}

                        </p> */}

                    </div>


                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {user?.role === "farmer" && (

                        <>
                            <Link
                                to="/farmer/createListing"
                                className="bg-green-700 text-white p-6 rounded shadow hover:bg-green-800"
                            >
                                Create Listing
                            </Link>

                            <Link
                                to="/farmer/myListings"
                                className="bg-green-700 text-white p-6 rounded shadow hover:bg-green-800"
                            >
                                My Listings
                            </Link>

                            <Link
                                to="/farmer/orders"
                                className="bg-green-700 text-white p-6 rounded shadow hover:bg-green-800"
                            >
                                Received Orders
                            </Link>

                        </>
                    )}

                    {user?.role === "vendor" && (

                        <>
                            <Link
                                to="/vendor/browseListings"
                                className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700"
                            >
                                Browse Listings
                            </Link>

                            <Link
                                to="/vendor/myOrders"
                                className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700"
                            >
                                My Orders
                            </Link>

                        </>
                    )}

                </div>

            </div>

        </div>
    )
}