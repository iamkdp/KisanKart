import { useState } from "react";
import api from "../api/axios.js";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
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
        <div>
            <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <input placeholder="Password" type="password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
            <select onChange={e => setFormData({ ...formData, role: e.target.value })}>
                <option value="farmer">Farmer</option>
                <option value="vendor">vendor</option>
            </select>
            <button onClick={handleSubmit}>Register</button>
        </div>
    )

}