import { useState, useEffect } from "react"
import api from "../../api/axios"
import PlaceOrder from "../../components/PlaceOrder"

const cropEmojis = {
  rice: "🌾", wheat: "🌾", tomato: "🍅", onion: "🧅",
  potato: "🥔", corn: "🌽", mango: "🥭", banana: "🍌",
  default: "🥬",
}

function getCropEmoji(name = "") {
  const key = name.toLowerCase()
  return Object.keys(cropEmojis).find(k => key.includes(k))
    ? cropEmojis[Object.keys(cropEmojis).find(k => key.includes(k))]
    : cropEmojis.default
}

function SkeletonCard() {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e4e7e1",
      borderRadius: 16, padding: 20, animation: "pulse 1.5s ease infinite",
    }}>
      {[80, 60, 100, 40].map((w, i) => (
        <div key={i} style={{
          height: i === 0 ? 20 : 14,
          width: `${w}%`,
          background: "#f0f0f0", borderRadius: 6,
          marginBottom: i === 3 ? 0 : 12,
        }} />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  )
}

export default function BrowseListings() {
  const [listings, setListings] = useState([])
  const [filters, setFilters] = useState({ name: "", location: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const fetchListings = async (activeFilters = filters) => {
    setLoading(true)
    setError("")
    try {
      const response = await api.get("/produce/", { params: activeFilters })
      setListings(response.data.produce)
      setSearched(true)
    } catch (err) {
      setError("Failed to load listings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchListings() }, [])

  const handleSearch = () => fetchListings(filters)

  const handleKey = (e) => { if (e.key === "Enter") handleSearch() }

  const handleClear = () => {
    const cleared = { name: "", location: "" }
    setFilters(cleared)
    fetchListings(cleared)
  }

  const hasFilters = filters.name || filters.location

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f7f8f6",
      fontFamily: "'DM Sans', sans-serif",
      padding: "32px 24px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(22px, 4vw, 30px)",
            fontWeight: 700, color: "#1a1f1c",
            letterSpacing: "-0.5px", marginBottom: 6,
          }}>
            Browse Listings
          </h1>
          <p style={{ fontSize: 14, color: "#6b7a72" }}>
            {listings.length > 0
              ? `${listings.length} listing${listings.length !== 1 ? "s" : ""} available`
              : "Find fresh produce directly from farmers"}
          </p>
        </div>

        {/* Search bar */}
        <div style={{
          background: "#fff",
          border: "1px solid #e4e7e1",
          borderRadius: 14,
          padding: "16px 20px",
          display: "flex", gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 28,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
          <div style={{ flex: 1, minWidth: 160, position: "relative" }}>
            <span style={{
              position: "absolute", left: 12, top: "50%",
              transform: "translateY(-50%)", fontSize: 15,
            }}>🔍</span>
            <input
              type="text"
              placeholder="Crop name..."
              value={filters.name}
              onChange={e => setFilters({ ...filters, name: e.target.value })}
              onKeyDown={handleKey}
              style={{
                width: "100%", padding: "9px 12px 9px 36px",
                border: "1.5px solid #e4e7e1", borderRadius: 9,
                fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                outline: "none", boxSizing: "border-box",
                color: "#1a1f1c", background: "#f7f8f6",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#1a6b3c"
                e.target.style.background = "#fff"
              }}
              onBlur={e => {
                e.target.style.borderColor = "#e4e7e1"
                e.target.style.background = "#f7f8f6"
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 160, position: "relative" }}>
            <span style={{
              position: "absolute", left: 12, top: "50%",
              transform: "translateY(-50%)", fontSize: 15,
            }}>📍</span>
            <input
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={e => setFilters({ ...filters, location: e.target.value })}
              onKeyDown={handleKey}
              style={{
                width: "100%", padding: "9px 12px 9px 36px",
                border: "1.5px solid #e4e7e1", borderRadius: 9,
                fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                outline: "none", boxSizing: "border-box",
                color: "#1a1f1c", background: "#f7f8f6",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#1a6b3c"
                e.target.style.background = "#fff"
              }}
              onBlur={e => {
                e.target.style.borderColor = "#e4e7e1"
                e.target.style.background = "#f7f8f6"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {hasFilters && (
              <button
                onClick={handleClear}
                style={{
                  padding: "9px 14px",
                  background: "#f7f8f6",
                  border: "1.5px solid #e4e7e1",
                  borderRadius: 9, fontSize: 13,
                  color: "#6b7a72", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Clear
              </button>
            )}
            <button
              onClick={handleSearch}
              style={{
                padding: "9px 22px",
                background: "#1a6b3c", color: "#fff",
                border: "none", borderRadius: 9,
                fontSize: 14, fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.target.style.background = "#0f4526"}
              onMouseLeave={e => e.target.style.background = "#1a6b3c"}
            >
              Search
            </button>
          </div>
        </div>

        {/* Active filters pill */}
        {hasFilters && searched && !loading && (
          <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {filters.name && (
              <span style={{
                background: "#e8f5ee", color: "#1a6b3c",
                border: "1px solid #b6dfc4",
                borderRadius: 20, padding: "3px 12px",
                fontSize: 12, fontWeight: 500,
              }}>
                Crop: {filters.name}
              </span>
            )}
            {filters.location && (
              <span style={{
                background: "#e8f5ee", color: "#1a6b3c",
                border: "1px solid #b6dfc4",
                borderRadius: 20, padding: "3px 12px",
                fontSize: 12, fontWeight: 500,
              }}>
                📍 {filters.location}
              </span>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: 12, padding: "14px 18px",
            color: "#dc2626", fontSize: 14, marginBottom: 20,
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
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
              fontFamily: "'Sora', sans-serif",
              fontSize: 20, fontWeight: 600,
              color: "#1a1f1c", marginBottom: 8,
            }}>
              {hasFilters ? "No listings match your search" : "No listings yet"}
            </h3>
            <p style={{ color: "#6b7a72", fontSize: 14, marginBottom: 20 }}>
              {hasFilters
                ? "Try a different crop name or location."
                : "Farmers haven't posted any produce yet. Check back soon."}
            </p>
            {hasFilters && (
              <button
                onClick={handleClear}
                style={{
                  background: "#e8f5ee", color: "#1a6b3c",
                  border: "1px solid #b6dfc4",
                  borderRadius: 8, padding: "9px 20px",
                  fontSize: 14, fontWeight: 500,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Listings grid */}
        {!loading && listings.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {listings.map((l, i) => (
              <ProduceCard key={l._id} listing={l} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProduceCard({ listing: l, index }) {
  const emoji = getCropEmoji(l.name)

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e4e7e1",
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      transition: "box-shadow 0.2s, transform 0.2s",
      opacity: 0,
      animation: `fadeUp 0.4s ease forwards`,
      animationDelay: `${index * 0.06}s`,
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.09)"
        e.currentTarget.style.transform = "translateY(-2px)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      {/* Card header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "#e8f5ee",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, flexShrink: 0,
          }}>
            {emoji}
          </div>
          <div>
            <h3 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 16, fontWeight: 600,
              color: "#1a1f1c", marginBottom: 2,
              textTransform: "capitalize",
            }}>
              {l.name}
            </h3>
            <span style={{ fontSize: 12, color: "#6b7a72" }}>
              📍 {l.location}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 20, fontWeight: 700, color: "#1a6b3c",
            letterSpacing: "-0.5px", lineHeight: 1,
          }}>
            ₹{l.price}
          </div>
          <div style={{ fontSize: 11, color: "#6b7a72", marginTop: 2 }}>
            per {l.unit}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{
          background: "#e8f5ee", color: "#1a6b3c",
          border: "1px solid #b6dfc4",
          borderRadius: 20, padding: "3px 10px",
          fontSize: 12, fontWeight: 500,
        }}>
          {l.quantity} {l.unit} available
        </span>
        <span style={{
          background: "#f7f8f6", color: "#3a3f3c",
          border: "1px solid #e4e7e1",
          borderRadius: 20, padding: "3px 10px",
          fontSize: 12,
        }}>
          🌾 {l.farmer?.name}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#f0f0ee", marginBottom: 16 }} />

      <PlaceOrder produceId={l._id} />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}