import { useState, useEffect } from "react";
import api from "../../api/axios";
import PlaceOrder from "../../components/PlaceOrder";
const BrowseListings = () => {
    const [listings, setListings] = useState([]);
    const [filters, setFilters] = useState({ name: "", location: "" });
    const [loading, setLoading] = useState(false);
    const fetchListings = async () => {
        try {
            setLoading(true);
            const response = await api.get("/produce/", { params: filters });
            setListings(response.data.produce);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching listings:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-6">

                Browse Listings

            </h2>

            <div className="flex gap-4 mb-8">

                <input
                    className="border p-3 rounded w-full"
                    type="text"
                    placeholder="Search by name..."
                    value={filters.name}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            name: e.target.value
                        })
                    }
                />

                <input
                    className="border p-3 rounded w-full"
                    type="text"
                    placeholder="Search by location..."
                    value={filters.location}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            location: e.target.value
                        })
                    }
                />

                <button
                    className="bg-green-700 text-white px-6 rounded hover:bg-green-800"
                    onClick={fetchListings}
                >
                    Search
                </button>

            </div>

            {loading ? (

                <p>Loading...</p>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {listings.map((l) => (

                        <div
                            key={l._id}
                            className="bg-white rounded-lg shadow-md p-5"
                        >

                            <h3 className="text-xl font-bold text-green-700">

                                {l.name}

                            </h3>

                            <p className="text-gray-600">

                                {l.quantity}
                                {l.unit}
                                {" "}
                                —
                                ₹{l.price}

                            </p>

                            <p className="text-gray-500">

                                {l.location}
                            </p>

                            <p className="text-gray-500 mb-4">

                                Farmer:
                                {l.farmer.name}
                            </p>

                            <PlaceOrder
                                produceId={l._id}
                            />

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default BrowseListings;