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
        <div>
            <input placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <input placeholder="Password" type="password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
            <button onClick={handleSubmit}>Login</button>
        </div>
    )

}