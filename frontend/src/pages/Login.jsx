import { useState } from "react";
import api from "../api/axios.js";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = async () => {
        try {
            const res = await api.post("/auth/login", formData);
            console.log(res.data);
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