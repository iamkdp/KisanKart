import api from "../../api/axios.js";
import { useEffect, useState } from "react";

export default function MyListings() {
    const [listings, setListings] = useState([]);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await api.get("/produce/my");
                setListings(response.data.produce);
            }
            catch (error) {
                setMessage(error.response.data.message || "An error occurred");
            }
        }
        fetchListings();
    }, []);
    const handledelete = async (id) => {
        await api.delete(`/produce/${id}`)
        setListings(listings.filter(l => l._id !== id))
    }
    return (
        <div>
            <h1>My Listings</h1>
            {message && <p>{message}</p>}
            {listings.length === 0 ? (
                <p>You have no listings.</p>
            ) : (
                <ul>
                    {listings.map((listing) => (
                        <li key={listing._id}>
                            <h2>{listing.name}</h2>
                            <p>Quantity: {listing.quantity} {listing.unit}</p>
                            <p>Price: ${listing.price.toFixed(2)}</p>
                            <p>Location: {listing.location}</p>
                            <button onClick={() => handledelete(listing._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}