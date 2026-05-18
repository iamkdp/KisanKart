import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
    const { user, logout } = useAuth();
    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Role :{user.role}</p>
            <button onClick={logout}>Logout</button>
            {user?.role === 'farmer' && (
                <div>
                    <a href="/farmer/createListing">Create Listing</a>
                    <a href="/farmer/myListings">My Listings</a>
                </div>
            )}
        </div>
    )
}