import { useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = async () => {
        try {
            const res = await api.post("/auth/login", formData);
            login(res.data.user, res.data.token);
            navigate("/dashboard");
        }
        catch (err) {
            console.log(err.response.data);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">

                    Login

                </h1>

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
                    className="w-full border p-3 rounded mb-6"
                    placeholder="Password"
                    type="password"
                    onChange={e =>
                        setFormData({
                            ...formData,
                            password: e.target.value
                        })
                    }
                />

                <button
                    className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
                    onClick={handleSubmit}
                >
                    Login
                </button>

            </div>

        </div>
    )

}