import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios.js"

function StatCard({ label, value, icon, loading }) {
    return (
        <div style={{
            background: "#fff", border: "1px solid #e4e7e1",
            borderRadius: 14, padding: "20px 20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
            {loading ? (
                <div style={{ height: 28, width: "50%", background: "#f0f0f0", borderRadius: 6, marginBottom: 6, animation: "pulse 1.5s ease infinite" }} />
            ) : (
                <div style={{
                    fontFamily: "'Sora', sans-serif", fontSize: 26,
                    fontWeight: 700, color: "#1a1f1c", letterSpacing: "-0.5px",
                    marginBottom: 4,
                }}>
                    {value ?? "—"}
                </div>
            )}
            <div style={{ fontSize: 13, color: "#6b7a72" }}>{label}</div>
        </div>
    )
}

function QuickLink({ to, icon, label, desc, accent }) {
    const [hovered, setHovered] = useState(false)
    return (
        <Link
            to={to}
            style={{
                display: "block", textDecoration: "none",
                background: hovered ? (accent ? "#0f4526" : "#f0f5f2") : (accent ? "#1a6b3c" : "#fff"),
                border: `1.5px solid ${accent ? "#1a6b3c" : "#e4e7e1"}`,
                borderRadius: 14, padding: "20px 22px",
                transition: "all 0.18s ease",
                transform: hovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hovered ? "0 8px 20px rgba(0,0,0,0.09)" : "0 2px 6px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
            <div style={{
                fontFamily: "'Sora', sans-serif", fontSize: 15,
                fontWeight: 600, marginBottom: 4,
                color: accent ? "#fff" : "#1a1f1c",
            }}>
                {label}
            </div>
            <div style={{ fontSize: 12, color: accent ? "rgba(255,255,255,0.7)" : "#6b7a72", lineHeight: 1.4 }}>
                {desc}
            </div>
        </Link>
    )
}

export default function Dashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [loadingStats, setLoadingStats] = useState(true)
    const isFarmer = user?.role === "farmer"

    useEffect(() => {
        const fetchStats = async () => {
            try {
                if (isFarmer) {
                    const [listingsRes, ordersRes] = await Promise.all([
                        api.get("/produce/my"),
                        api.get("/orders/received"),
                    ])
                    const listings = listingsRes.data.produce || []
                    const orders = ordersRes.data.orders || []
                    setStats({
                        listings: listings.length,
                        pending: orders.filter(o => o.status === "pending").length,
                        accepted: orders.filter(o => o.status === "accepted").length,
                    })
                } else {
                    const res = await api.get("/orders/my")
                    const orders = res.data.orders || []
                    setStats({
                        total: orders.length,
                        pending: orders.filter(o => o.status === "pending").length,
                        accepted: orders.filter(o => o.status === "accepted").length,
                    })
                }
            } catch (_) {
                // stats are optional, fail silently
            } finally {
                setLoadingStats(false)
            }
        }
        fetchStats()
    }, [isFarmer])

    const farmerStats = [
        { label: "Active listings", value: stats?.listings, icon: "🌾" },
        { label: "Pending orders", value: stats?.pending, icon: "⏳" },
        { label: "Accepted orders", value: stats?.accepted, icon: "✅" },
    ]

    const vendorStats = [
        { label: "Orders placed", value: stats?.total, icon: "🛒" },
        { label: "Pending", value: stats?.pending, icon: "⏳" },
        { label: "Accepted", value: stats?.accepted, icon: "✅" },
    ]

    const farmerLinks = [
        { to: "/farmer/createListing", icon: "➕", label: "Post a Listing", desc: "List your produce for vendors to browse", accent: true },
        { to: "/farmer/myListings", icon: "📋", label: "My Listings", desc: "View and manage your active listings" },
        { to: "/farmer/orders", icon: "📦", label: "Received Orders", desc: "Accept or reject incoming vendor orders" },
    ]

    const vendorLinks = [
        { to: "/vendor/browseListings", icon: "🔍", label: "Browse Listings", desc: "Find fresh produce directly from farmers", accent: true },
        { to: "/vendor/myOrders", icon: "🧾", label: "My Orders", desc: "Track orders you've placed with farmers" },
    ]

    const links = isFarmer ? farmerLinks : vendorLinks
    const statCards = isFarmer ? farmerStats : vendorStats

    const timeOfDay = () => {
        const h = new Date().getHours()
        if (h < 12) return "Good morning"
        if (h < 17) return "Good afternoon"
        return "Good evening"
    }

    return (
        <div style={{
            minHeight: "100vh", background: "#f7f8f6",
            fontFamily: "'DM Sans', sans-serif", padding: "32px 24px",
        }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>

                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: "50%",
                            background: isFarmer ? "#e8f5ee" : "#fff8ec",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 22, flexShrink: 0,
                        }}>
                            {isFarmer ? "🌾" : "🏪"}
                        </div>
                        <div>
                            <p style={{ fontSize: 13, color: "#6b7a72", marginBottom: 2 }}>
                                {timeOfDay()}
                            </p>
                            <h1 style={{
                                fontFamily: "'Sora', sans-serif",
                                fontSize: "clamp(20px, 4vw, 28px)",
                                fontWeight: 700, color: "#1a1f1c",
                                letterSpacing: "-0.5px", lineHeight: 1.1,
                            }}>
                                {user?.name}
                                <span style={{
                                    marginLeft: 10, fontSize: 12, fontWeight: 600,
                                    color: isFarmer ? "#1a6b3c" : "#c17c1a",
                                    background: isFarmer ? "#e8f5ee" : "#fff8ec",
                                    border: `1px solid ${isFarmer ? "#b6dfc4" : "#f5d9a0"}`,
                                    borderRadius: 20, padding: "2px 10px",
                                    verticalAlign: "middle", textTransform: "capitalize",
                                }}>
                                    {user?.role}
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: 14, marginBottom: 32,
                }}>
                    {statCards.map((s, i) => (
                        <StatCard key={i} {...s} loading={loadingStats} />
                    ))}
                </div>

                {/* Quick actions */}
                <div style={{ marginBottom: 10 }}>
                    <h2 style={{
                        fontFamily: "'Sora', sans-serif", fontSize: 16,
                        fontWeight: 600, color: "#1a1f1c",
                        letterSpacing: "-0.2px", marginBottom: 14,
                    }}>
                        Quick Actions
                    </h2>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: 14,
                    }}>
                        {links.map(link => (
                            <QuickLink key={link.to} {...link} />
                        ))}
                    </div>
                </div>

                {/* Tip banner */}
                <div style={{
                    marginTop: 32,
                    background: isFarmer ? "#e8f5ee" : "#fff8ec",
                    border: `1px solid ${isFarmer ? "#b6dfc4" : "#f5d9a0"}`,
                    borderRadius: 14, padding: "16px 20px",
                    display: "flex", alignItems: "center", gap: 14,
                }}>
                    <span style={{ fontSize: 24 }}>{isFarmer ? "💡" : "💡"}</span>
                    <p style={{ fontSize: 13, color: isFarmer ? "#1a6b3c" : "#c17c1a", lineHeight: 1.6 }}>
                        {isFarmer
                            ? "Keep your listings up to date with accurate quantities and prices to get more orders from vendors."
                            : "Use crop and location filters in Browse Listings to find the best deals near you."}
                    </p>
                </div>

            </div>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
        </div>
    )
}