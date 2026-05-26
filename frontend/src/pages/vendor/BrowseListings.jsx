import { useState, useEffect } from "react";
import api from "../../api/axios";
import PlaceOrder from "../../components/PlaceOrder";
const BrowseListings = () => {
    const [listings, setListings] = useState([]);
    const [filters, setFilters] = useState({ name: "", location: "" });
    const [loading, setLoading] = useState(false);
    const fetchListings = async () => {
        try {
            setLoading(true);
            const response = await api.get("/produce/", { params: filters });
            setListings(response.data.produce);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching listings:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    return (
        <div>
            <h2>Browse Listings</h2>
            <input
                type="text"
                placeholder="Search by name..."
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Search by location..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
            <button onClick={fetchListings}>Search</button>
            {
                loading ? <p>Loading...</p> :
                listings.map(l =>
                (
                    <div key={l._id}>
                        <p>{l.name} — {l.quantity}{l.unit} — ₹{l.price}</p>
                        <p>Farmer: {l.farmer.name} — {l.location}</p>
                        <PlaceOrder produceId={l._id} />
                    </div>

                ))
            }
        </div>
    );
};

export default BrowseListings;