import api from "../../api/axios.js";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function CreateListing() {

    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "kg",
        price: "",
        location: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/produce",
                formData
            );

            setMessage(
                "Listing created successfully"
            );

            setFormData({
                name: "",
                quantity: "",
                unit: "kg",
                price: "",
                location: ""
            });

        }
        catch (error) {

            setMessage(
                error?.response?.data?.message ||
                "Something went wrong"
            );

        }

    }

    if (user?.role === "vendor") {

        return (

            <div className="min-h-screen flex items-center justify-center bg-gray-100">

                <div className="bg-white rounded-lg shadow-md p-8">

                    <h3 className="text-red-500 text-xl font-semibold">

                        Only farmers can create listings

                    </h3>

                </div>

            </div>

        )

    }

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto">

                <h1 className="text-3xl font-bold text-green-700 mb-6">

                    Create Listing

                </h1>

                <input
                    className="w-full border p-3 rounded mb-4"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Crop Name"
                />

                <input
                    className="w-full border p-3 rounded mb-4"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                />

                <input
                    className="w-full border p-3 rounded mb-4"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="Unit"
                />

                <input
                    className="w-full border p-3 rounded mb-4"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                />

                <input
                    className="w-full border p-3 rounded mb-6"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                />

                <button
                    className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
                    onClick={handleSubmit}
                >

                    Create Listing

                </button>

                {message && (

                    <p className="text-green-700 mt-4">

                        {message}

                    </p>

                )}

            </div>

        </div>

    )
}