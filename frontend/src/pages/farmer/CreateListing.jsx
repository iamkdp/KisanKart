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
            <h3>
                Only farmers can create listings
            </h3>
        )
    }

    return (
        <div>

            <h1>Create Listing</h1>

            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />

            <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
            />

            <input
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Unit"
            />

            <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
            />

            <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
            />

            <button onClick={handleSubmit}>
                Create Listing
            </button>

            {message && <p>{message}</p>}

        </div>
    )
}