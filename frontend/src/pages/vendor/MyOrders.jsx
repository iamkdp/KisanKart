import { useEffect, useState } from "react"
import api from "../../api/axios"

const statusConfig = {
    pending: { label: "Pending", bg: "#fff8ec", color: "#c17c1a", border: "#f5d9a0", icon: "⏳" },
    accepted: { label: "Accepted", bg: "#e8f5ee", color: "#1a6b3c", border: "#b6dfc4", icon: "✅" },
    rejected: { label: "Rejected", bg: "#fef2f2", color: "#dc2626", border: "#fecaca", icon: "❌" },
}

function StatusBadge({ status }) {
    const s = statusConfig[status] || statusConfig.pending
    return (
        <span style={{
            background: s.bg, color: s.color,
            border: `1px solid ${s.border}`,
            borderRadius: 20, padding: "3px 10px",
            fontSize: 12, fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 4,
        }}>
            {s.icon} {s.label}
        </span>
    )
}

function SkeletonCard() {
    return (
        <div style={{
            background: "#fff", border: "1px solid #e4e7e1",
            borderRadius: 16, padding: 20, animation: "pulse 1.5s ease infinite", height: 160,
        }} />
    )
}

export default function MyOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filter, setFilter] = useState("all")

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders/my")
                setOrders(res.data.orders)
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to fetch orders")
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    const counts = {
        all: orders.length,
        pending: orders.filter(o => o.status === "pending").length,
        accepted: orders.filter(o => o.status === "accepted").length,
        rejected: orders.filter(o => o.status === "rejected").length,
    }

    const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter)

    return (
        <div style={{
            minHeight: "100vh", background: "#f7f8f6",
            fontFamily: "'DM Sans', sans-serif", padding: "32px 24px",
        }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* Header */}
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700,
                        color: "#1a1f1c", letterSpacing: "-0.5px", marginBottom: 6,
                    }}>
                        My Orders
                    </h1>
                    <p style={{ fontSize: 14, color: "#6b7a72" }}>
                        {!loading && orders.length > 0
                            ? `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`
                            : "Track orders you've placed with farmers"}
                    </p>
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

                {/* Filter tabs */}
                {!loading && orders.length > 0 && (
                    <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                        {["all", "pending", "accepted", "rejected"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    padding: "7px 16px",
                                    background: filter === f ? "#1a6b3c" : "#fff",
                                    color: filter === f ? "#fff" : "#3a3f3c",
                                    border: filter === f ? "1.5px solid #1a6b3c" : "1.5px solid #e4e7e1",
                                    borderRadius: 20, fontSize: 13, fontWeight: 500,
                                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                    transition: "all 0.15s",
                                }}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                                {counts[f] > 0 && (
                                    <span style={{
                                        marginLeft: 6,
                                        background: filter === f ? "rgba(255,255,255,0.25)" : "#f0f0f0",
                                        borderRadius: 10, padding: "1px 7px", fontSize: 11,
                                    }}>
                                        {counts[f]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Skeletons */}
                {loading && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                    </div>
                )}

                {/* Empty */}
                {!loading && filtered.length === 0 && (
                    <div style={{
                        textAlign: "center", padding: "72px 24px",
                        background: "#fff", borderRadius: 16,
                        border: "1px solid #e4e7e1",
                    }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
                        <h3 style={{
                            fontFamily: "'Sora', sans-serif", fontSize: 20,
                            fontWeight: 600, color: "#1a1f1c", marginBottom: 8,
                        }}>
                            {filter === "all" ? "No orders yet" : `No ${filter} orders`}
                        </h3>
                        <p style={{ color: "#6b7a72", fontSize: 14, marginBottom: 24 }}>
                            {filter === "all"
                                ? "Browse listings and place your first order with a farmer."
                                : `You have no ${filter} orders right now.`}
                        </p>
                        {filter === "all" && (
                            <a href="/vendor/browseListings" style={{
                                display: "inline-block",
                                background: "#1a6b3c", color: "#fff",
                                border: "none", borderRadius: 10,
                                padding: "11px 24px", fontSize: 14, fontWeight: 600,
                                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                            }}>
                                Browse Listings
                            </a>
                        )}
                    </div>
                )}

                {/* Orders grid */}
                {!loading && filtered.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                        {filtered.map((order, i) => (
                            <div key={order._id} style={{
                                background: "#fff", border: "1px solid #e4e7e1",
                                borderRadius: 16, padding: 20,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                opacity: 0, animation: "fadeUp 0.4s ease forwards",
                                animationDelay: `${i * 0.06}s`,
                            }}>
                                {/* Header */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                                    <div>
                                        <h3 style={{
                                            fontFamily: "'Sora', sans-serif", fontSize: 16,
                                            fontWeight: 600, color: "#1a1f1c", marginBottom: 3,
                                            textTransform: "capitalize",
                                        }}>
                                            {order.item?.name}
                                        </h3>
                                        <span style={{ fontSize: 12, color: "#6b7a72" }}>
                                            🌾 {order.farmer?.name}
                                        </span>
                                    </div>
                                    <StatusBadge status={order.status} />
                                </div>

                                {/* Details */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                    {[
                                        ["Quantity", `${order.quantity} ${order.item?.unit || "kg"}`],
                                        ["Price", `₹${order.item?.price}/${order.item?.unit || "kg"}`],
                                        ["Total", `₹${order.totalPrice}`],
                                    ].map(([label, val]) => (
                                        <div key={label} style={{
                                            background: "#f7f8f6", borderRadius: 10, padding: "10px 12px",
                                        }}>
                                            <div style={{ fontSize: 11, color: "#6b7a72", marginBottom: 3 }}>{label}</div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1f1c" }}>{val}</div>
                                        </div>
                                    ))}
                                </div>

                                {order.status === "pending" && (
                                    <p style={{
                                        marginTop: 12, fontSize: 12, color: "#c17c1a",
                                        background: "#fff8ec", border: "1px solid #f5d9a0",
                                        borderRadius: 8, padding: "8px 10px",
                                    }}>
                                        ⏳ Waiting for farmer to respond
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
      `}</style>
        </div>
    )
}