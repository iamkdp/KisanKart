import { useEffect, useState } from "react"
import api from "../../api/axios"

const statusConfig = {
    pending: { label: "Pending", bg: "#fff8ec", color: "#c17c1a", border: "#f5d9a0" },
    accepted: { label: "Accepted", bg: "#e8f5ee", color: "#1a6b3c", border: "#b6dfc4" },
    rejected: { label: "Rejected", bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
}

function StatusBadge({ status }) {
    const s = statusConfig[status] || statusConfig.pending
    return (
        <span style={{
            background: s.bg, color: s.color,
            border: `1px solid ${s.border}`,
            borderRadius: 20, padding: "3px 10px",
            fontSize: 12, fontWeight: 600,
        }}>
            {s.label}
        </span>
    )
}

export default function ReceivedOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [updatingId, setUpdatingId] = useState(null)
    const [filter, setFilter] = useState("all")

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get("/orders/received")
                setOrders(res.data.orders)
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to fetch orders")
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [])

    const updateStatus = async (id, status) => {
        setUpdatingId(id)
        try {
            await api.put(`/orders/${id}`, { status })
            setOrders(orders.map(o => o._id === id ? { ...o, status } : o))
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update order")
        } finally {
            setUpdatingId(null)
        }
    }

    const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter)
    const counts = {
        all: orders.length,
        pending: orders.filter(o => o.status === "pending").length,
        accepted: orders.filter(o => o.status === "accepted").length,
        rejected: orders.filter(o => o.status === "rejected").length,
    }

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
                        Received Orders
                    </h1>
                    <p style={{ fontSize: 14, color: "#6b7a72" }}>
                        {counts.pending > 0
                            ? `${counts.pending} order${counts.pending !== 1 ? "s" : ""} waiting for your response`
                            : "All orders reviewed"}
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
                    <div style={{
                        display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap",
                    }}>
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
                                        marginLeft: 6, background: filter === f ? "rgba(255,255,255,0.25)" : "#f0f0f0",
                                        borderRadius: 10, padding: "1px 7px", fontSize: 11,
                                    }}>
                                        {counts[f]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20,
                    }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                background: "#fff", border: "1px solid #e4e7e1",
                                borderRadius: 16, padding: 20, animation: "pulse 1.5s ease infinite",
                                height: 180,
                            }} />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && filtered.length === 0 && (
                    <div style={{
                        textAlign: "center", padding: "72px 24px",
                        background: "#fff", borderRadius: 16,
                        border: "1px solid #e4e7e1",
                    }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
                        <h3 style={{
                            fontFamily: "'Sora', sans-serif", fontSize: 20,
                            fontWeight: 600, color: "#1a1f1c", marginBottom: 8,
                        }}>
                            {filter === "all" ? "No orders yet" : `No ${filter} orders`}
                        </h3>
                        <p style={{ color: "#6b7a72", fontSize: 14 }}>
                            {filter === "all"
                                ? "When vendors place orders on your listings, they'll appear here."
                                : `You have no ${filter} orders right now.`}
                        </p>
                    </div>
                )}

                {/* Orders grid */}
                {!loading && filtered.length > 0 && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20,
                    }}>
                        {filtered.map((order, i) => (
                            <div key={order._id} style={{
                                background: "#fff", border: "1px solid #e4e7e1",
                                borderRadius: 16, padding: 20,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                opacity: 0, animation: "fadeUp 0.4s ease forwards",
                                animationDelay: `${i * 0.06}s`,
                            }}>
                                {/* Order header */}
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
                                            🏪 {order.vendor?.name}
                                        </span>
                                    </div>
                                    <StatusBadge status={order.status} />
                                </div>

                                {/* Details */}
                                <div style={{
                                    display: "grid", gridTemplateColumns: "1fr 1fr",
                                    gap: 8, marginBottom: 16,
                                }}>
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

                                {/* Actions */}
                                {order.status === "pending" && (
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button
                                            onClick={() => updateStatus(order._id, "accepted")}
                                            disabled={updatingId === order._id}
                                            style={{
                                                flex: 1, background: "#1a6b3c", color: "#fff",
                                                border: "none", borderRadius: 9,
                                                padding: "10px", fontSize: 13, fontWeight: 600,
                                                cursor: updatingId === order._id ? "not-allowed" : "pointer",
                                                fontFamily: "'DM Sans', sans-serif",
                                                opacity: updatingId === order._id ? 0.7 : 1,
                                                transition: "background 0.15s",
                                            }}
                                            onMouseEnter={e => { if (updatingId !== order._id) e.target.style.background = "#0f4526" }}
                                            onMouseLeave={e => { if (updatingId !== order._id) e.target.style.background = "#1a6b3c" }}
                                        >
                                            {updatingId === order._id ? "..." : "✓ Accept"}
                                        </button>
                                        <button
                                            onClick={() => updateStatus(order._id, "rejected")}
                                            disabled={updatingId === order._id}
                                            style={{
                                                flex: 1, background: "#fef2f2", color: "#dc2626",
                                                border: "1px solid #fecaca", borderRadius: 9,
                                                padding: "10px", fontSize: 13, fontWeight: 500,
                                                cursor: updatingId === order._id ? "not-allowed" : "pointer",
                                                fontFamily: "'DM Sans', sans-serif",
                                                transition: "background 0.15s",
                                            }}
                                            onMouseEnter={e => { if (updatingId !== order._id) e.target.style.background = "#fee2e2" }}
                                            onMouseLeave={e => { if (updatingId !== order._id) e.target.style.background = "#fef2f2" }}
                                        >
                                            ✕ Reject
                                        </button>
                                    </div>
                                )}

                                {order.status !== "pending" && (
                                    <div style={{
                                        textAlign: "center", fontSize: 12,
                                        color: order.status === "accepted" ? "#1a6b3c" : "#dc2626",
                                        padding: "8px",
                                        background: order.status === "accepted" ? "#e8f5ee" : "#fef2f2",
                                        borderRadius: 8,
                                    }}>
                                        {order.status === "accepted" ? "✓ You accepted this order" : "✕ You rejected this order"}
                                    </div>
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