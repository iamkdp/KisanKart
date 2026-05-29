import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/login")
        setMenuOpen(false)
    }

    const farmerLinks = [
        { label: "My Listings", path: "/farmer/listings" },
        { label: "Post Produce", path: "/farmer/create" },
        { label: "Orders Received", path: "/farmer/orders" },
    ]

    const vendorLinks = [
        { label: "Browse Listings", path: "/vendor/browse" },
        { label: "My Orders", path: "/vendor/orders" },
    ]

    const links = user?.role === "farmer" ? farmerLinks : vendorLinks

    return (
        <>
            <nav style={{
                position: "sticky", top: 0, zIndex: 50,
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid #e4e7e1",
                fontFamily: "'DM Sans', sans-serif",
            }}>
                <div style={{
                    maxWidth: 1200, margin: "0 auto",
                    padding: "0 24px",
                    height: 60,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>

                    {/* Logo */}
                    <Link to={user ? "/dashboard" : "/"} style={{ textDecoration: "none" }}>
                        <span style={{
                            fontFamily: "'Sora', sans-serif", fontWeight: 700,
                            fontSize: 20, color: "#1a6b3c", letterSpacing: "-0.3px",
                        }}>
                            🌾 KisanKart
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    {/* {user && (
            <div style={{
              display: "flex", gap: 4, alignItems: "center",
            }} className="desktop-links">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: 14, fontWeight: 500,
                    color: "#3a3f3c", textDecoration: "none",
                    padding: "6px 12px", borderRadius: 8,
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = "#e8f5ee"
                    e.target.style.color = "#1a6b3c"
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = "transparent"
                    e.target.style.color = "#3a3f3c"
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )} */}

                    {/* Right side */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {user ? (
                            <>
                                {/* User pill */}
                                <div style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    background: "#f7f8f6",
                                    border: "1px solid #e4e7e1",
                                    borderRadius: 24, padding: "5px 12px 5px 6px",
                                }} className="desktop-links">
                                    <div style={{
                                        width: 28, height: 28, borderRadius: "50%",
                                        background: user.role === "farmer" ? "#e8f5ee" : "#fff8ec",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 14,
                                    }}>
                                        {user.role === "farmer" ? "🌾" : "🏪"}
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1f1c" }}>
                                        {user.name}
                                    </span>
                                    <span style={{
                                        fontSize: 11, fontWeight: 600,
                                        color: user.role === "farmer" ? "#1a6b3c" : "#c17c1a",
                                        background: user.role === "farmer" ? "#e8f5ee" : "#fff8ec",
                                        border: `1px solid ${user.role === "farmer" ? "#b6dfc4" : "#f5d9a0"}`,
                                        borderRadius: 10, padding: "1px 8px",
                                        textTransform: "capitalize",
                                    }}>
                                        {user.role}
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: "#fef2f2",
                                        color: "#dc2626",
                                        border: "1px solid #fecaca",
                                        borderRadius: 8,
                                        padding: "6px 14px",
                                        fontSize: 13, fontWeight: 500,
                                        cursor: "pointer",
                                        fontFamily: "'DM Sans', sans-serif",
                                        transition: "background 0.15s",
                                    }}
                                    onMouseEnter={e => e.target.style.background = "#fee2e2"}
                                    onMouseLeave={e => e.target.style.background = "#fef2f2"}
                                    className="desktop-links"
                                >
                                    Logout
                                </button>

                                {/* Mobile hamburger */}
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    style={{
                                        background: "none", border: "none",
                                        cursor: "pointer", padding: 4, color: "#1a1f1c",
                                        fontSize: 22, lineHeight: 1,
                                    }}
                                    className="mobile-menu-btn"
                                >
                                    {menuOpen ? "✕" : "☰"}
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    style={{
                                        background: "transparent",
                                        border: "1.5px solid #1a6b3c",
                                        color: "#1a6b3c",
                                        borderRadius: 8, padding: "6px 16px",
                                        fontSize: 14, fontWeight: 500,
                                        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
                                    style={{
                                        background: "#1a6b3c",
                                        border: "none",
                                        color: "#fff",
                                        borderRadius: 8, padding: "7px 18px",
                                        fontSize: 14, fontWeight: 500,
                                        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                    }}
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile dropdown */}
                {menuOpen && user && (
                    <div style={{
                        borderTop: "1px solid #e4e7e1",
                        background: "#fff",
                        padding: "12px 24px 16px",
                    }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "10px 0 14px",
                            borderBottom: "1px solid #e4e7e1", marginBottom: 10,
                        }}>
                            <div style={{
                                width: 34, height: 34, borderRadius: "50%",
                                background: user.role === "farmer" ? "#e8f5ee" : "#fff8ec",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 16,
                            }}>
                                {user.role === "farmer" ? "🌾" : "🏪"}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1f1c" }}>{user.name}</div>
                                <div style={{ fontSize: 12, color: "#6b7a72", textTransform: "capitalize" }}>{user.role}</div>
                            </div>
                        </div>

                        {links.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    display: "block",
                                    padding: "10px 0",
                                    fontSize: 15, fontWeight: 500,
                                    color: "#1a1f1c", textDecoration: "none",
                                    borderBottom: "1px solid #f0f0f0",
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <button
                            onClick={handleLogout}
                            style={{
                                marginTop: 14, width: "100%",
                                background: "#fef2f2", color: "#dc2626",
                                border: "1px solid #fecaca",
                                borderRadius: 8, padding: "10px",
                                fontSize: 14, fontWeight: 500,
                                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </nav>

            <style>{`
        .desktop-links { display: flex !important; }
        .mobile-menu-btn { display: none !important; }

        @media (max-width: 640px) {
          .desktop-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
        </>
    )
}