import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios.js"

const cropEmojis = {
    rice: "🌾", wheat: "🌾", tomato: "🍅", onion: "🧅",
    potato: "🥔", corn: "🌽", mango: "🥭", banana: "🍌",
    default: "🥬",
}
function getCropEmoji(name = "") {
    const key = name.toLowerCase()
    const match = Object.keys(cropEmojis).find(k => key.includes(k))
    return match ? cropEmojis[match] : cropEmojis.default
}

function SkeletonCard() {
    return (
        <div style={{
            background: "#fff", border: "1px solid #e4e7e1",
            borderRadius: 16, padding: 20, animation: "pulse 1.5s ease infinite",
        }}>
            {[70, 50, 90, 40].map((w, i) => (
                <div key={i} style={{
                    height: i === 0 ? 18 : 13, width: `${w}%`,
                    background: "#f0f0f0", borderRadius: 6,
                    marginBottom: i === 3 ? 0 : 12,
                }} />
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
        </div>
    )
}

export default function MyListings() {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [deletingId, setDeletingId] = useState(null)
    const [confirmId, setConfirmId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await api.get("/produce/my")
                setListings(res.data.produce)
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to load listings")
            } finally {
                setLoading(false)
            }
        }
        fetchListings()
    }, [])

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            await api.delete(`/produce/${id}`)
            setListings(listings.filter(l => l._id !== id))
        } catch (err) {
            setError("Failed to delete listing")
        } finally {
            setDeletingId(null)
            setConfirmId(null)
        }
    }

    return (
        <div style={{
            minHeight: "100vh", background: "#f7f8f6",
            fontFamily: "'DM Sans', sans-serif", padding: "32px 24px",
        }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* Header */}
                <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12,
                }}>
                    <div>
                        <h1 style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700,
                            color: "#1a1f1c", letterSpacing: "-0.5px", marginBottom: 6,
                        }}>
                            My Listings
                        </h1>
                        <p style={{ fontSize: 14, color: "#6b7a72" }}>
                            {!loading && `${listings.length} active listing${listings.length !== 1 ? "s" : ""}`}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/farmer/create")}
                        style={{
                            background: "#1a6b3c", color: "#fff",
                            border: "none", borderRadius: 10,
                            padding: "10px 20px", fontSize: 14, fontWeight: 600,
                            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                            display: "flex", alignItems: "center", gap: 6,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#0f4526"}
                        onMouseLeave={e => e.currentTarget.style.background = "#1a6b3c"}
                    >
                        + Post New Listing
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        background: "#fef2f2", border: "1px solid #fecaca",
                        borderRadius: 12, padding: "13px 18px",
                        color: "#dc2626", fontSize: 14, marginBottom: 20,
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Skeletons */}
                {loading && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20,
                    }}>
                        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                    </div>
                )}

                {/* Empty state */}
                {!loading && listings.length === 0 && (
                    <div style={{
                        textAlign: "center", padding: "72px 24px",
                        background: "#fff", borderRadius: 16,
                        border: "1px solid #e4e7e1",
                    }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>🌾</div>
                        <h3 style={{
                            fontFamily: "'Sora', sans-serif", fontSize: 20,
                            fontWeight: 600, color: "#1a1f1c", marginBottom: 8,
                        }}>
                            No listings yet
                        </h3>
                        <p style={{ color: "#6b7a72", fontSize: 14, marginBottom: 24 }}>
                            Post your first produce listing and start receiving orders from vendors.
                        </p>
                        <button
                            onClick={() => navigate("/farmer/create")}
                            style={{
                                background: "#1a6b3c", color: "#fff",
                                border: "none", borderRadius: 10,
                                padding: "11px 24px", fontSize: 14, fontWeight: 600,
                                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            Post Your First Listing
                        </button>
                    </div>
                )}

                {/* Grid */}
                {!loading && listings.length > 0 && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20,
                    }}>
                        {listings.map((l, i) => (
                            <div key={l._id} style={{
                                background: "#fff", border: "1px solid #e4e7e1",
                                borderRadius: 16, padding: 20,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                opacity: 0, animation: "fadeUp 0.4s ease forwards",
                                animationDelay: `${i * 0.07}s`,
                                position: "relative",
                            }}>
                                {/* Header */}
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12,
                                        background: "#e8f5ee",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 22, flexShrink: 0,
                                    }}>
                                        {getCropEmoji(l.name)}
                                    </div>
                                    <div>
                                        <h2 style={{
                                            fontFamily: "'Sora', sans-serif", fontSize: 16,
                                            fontWeight: 600, color: "#1a1f1c", marginBottom: 2,
                                            textTransform: "capitalize",
                                        }}>
                                            {l.name}
                                        </h2>
                                        <span style={{ fontSize: 12, color: "#6b7a72" }}>📍 {l.location}</span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div style={{
                                    display: "grid", gridTemplateColumns: "1fr 1fr",
                                    gap: 10, marginBottom: 16,
                                }}>
                                    {[
                                        ["Quantity", `${l.quantity} ${l.unit || "kg"}`],
                                        ["Price", `₹${l.price}/${l.unit || "kg"}`],
                                    ].map(([label, val]) => (
                                        <div key={label} style={{
                                            background: "#f7f8f6", borderRadius: 10,
                                            padding: "10px 12px",
                                        }}>
                                            <div style={{ fontSize: 11, color: "#6b7a72", marginBottom: 3 }}>{label}</div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1f1c" }}>{val}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Delete */}
                                {confirmId === l._id ? (
                                    <div style={{
                                        background: "#fef2f2", border: "1px solid #fecaca",
                                        borderRadius: 10, padding: "12px",
                                    }}>
                                        <p style={{ fontSize: 13, color: "#dc2626", marginBottom: 10, fontWeight: 500 }}>
                                            Delete this listing?
                                        </p>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <button
                                                onClick={() => handleDelete(l._id)}
                                                disabled={deletingId === l._id}
                                                style={{
                                                    flex: 1, background: "#dc2626", color: "#fff",
                                                    border: "none", borderRadius: 8,
                                                    padding: "8px", fontSize: 13, fontWeight: 600,
                                                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                                }}
                                            >
                                                {deletingId === l._id ? "Deleting..." : "Yes, delete"}
                                            </button>
                                            <button
                                                onClick={() => setConfirmId(null)}
                                                style={{
                                                    flex: 1, background: "#f7f8f6", color: "#3a3f3c",
                                                    border: "1px solid #e4e7e1", borderRadius: 8,
                                                    padding: "8px", fontSize: 13,
                                                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setConfirmId(l._id)}
                                        style={{
                                            width: "100%", background: "#fef2f2", color: "#dc2626",
                                            border: "1px solid #fecaca", borderRadius: 9,
                                            padding: "9px", fontSize: 13, fontWeight: 500,
                                            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                            transition: "background 0.15s",
                                        }}
                                        onMouseEnter={e => e.target.style.background = "#fee2e2"}
                                        onMouseLeave={e => e.target.style.background = "#fef2f2"}
                                    >
                                        Delete Listing
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
    )
}