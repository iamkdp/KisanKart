import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return (
        <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center ">
            <h1 className="font-bold text-lg"> Kisan Kart</h1>
            {
                user ? (
                    <div className="flex gap-4 items-center">
                        <span>{user.name} ({user.role})</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                ) :
                    (
                        <div className="flex gap-4 items-center">
                            <button onClick={() => navigate('/login')}
                                className="bg-white text-green-700 px-3 py-1 rounded">
                                Login
                            </button>
                            <button onClick={() => navigate('/register')}
                                className="bg-white text-green-700 px-3 py-1 rounded">
                                Register
                            </button>
                        </div>

                    )
            }
        </nav>
    )
}