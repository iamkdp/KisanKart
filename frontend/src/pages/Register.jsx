import { useState } from "react";
import api from "../api/axios.js";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "farmer"
    });
    const handleSubmit = async () => {
        try {
            const res = await api.post("/auth/register", formData);
            console.log(res.data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">

                    Register

                </h1>

                <input
                    className="w-full border p-3 rounded mb-4"
                    placeholder="Name"
                    onChange={e =>
                        setFormData({
                            ...formData,
                            name: e.target.value
                        })
                    }
                />

                <input
                    className="w-full border p-3 rounded mb-4"
                    placeholder="Email"
                    onChange={e =>
                        setFormData({
                            ...formData,
                            email: e.target.value
                        })
                    }
                />

                <input
                    className="w-full border p-3 rounded mb-4"
                    placeholder="Password"
                    type="password"
                    onChange={e =>
                        setFormData({
                            ...formData,
                            password: e.target.value
                        })
                    }
                />

                <select
                    className="w-full border p-3 rounded mb-6"
                    value={formData.role}
                    onChange={e =>
                        setFormData({
                            ...formData,
                            role: e.target.value
                        })
                    }
                >

                    <option value="farmer">
                        Farmer
                    </option>

                    <option value="vendor">
                        Vendor
                    </option>

                </select>

                <button
                    className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
                    onClick={handleSubmit}
                >
                    Register
                </button>

            </div>

        </div>
    )

}