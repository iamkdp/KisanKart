import api from "../../api/axios.js";
import { useEffect, useState } from "react";

export default function MyListings() {
    const [listings, setListings] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await api.get("/produce/my");
                setListings(response.data.produce);
            }
            catch (error) {
                setMessage(error.response.data.message || "An error occurred");
            }
        }
        fetchListings();
    }, []);
    const handledelete = async (id) => {
        await api.delete(`/produce/${id}`)
        setListings(listings.filter(l => l._id !== id))
    }
    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold text-green-700 mb-6">
                My Listings
            </h1>

            {message && (
                <p className="text-red-500 mb-4">
                    {message}
                </p>
            )}

            {listings.length === 0 ? (

                <p className="text-gray-500">
                    You have no listings
                </p>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {listings.map((listing) => (

                        <div
                            key={listing._id}
                            className="bg-white rounded-lg shadow-md p-6"
                        >

                            <h2 className="text-xl font-bold text-green-700 mb-2">

                                {listing.name}

                            </h2>

                            <p className="text-gray-600">

                                Quantity:
                                {listing.quantity}
                                {listing.unit}

                            </p>

                            <p className="text-gray-600">

                                Price:
                                ₹{listing.price}

                            </p>

                            <p className="text-gray-500 mb-4">

                                {listing.location}

                            </p>

                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() =>
                                    handledelete(
                                        listing._id
                                    )
                                }
                            >

                                Delete

                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}