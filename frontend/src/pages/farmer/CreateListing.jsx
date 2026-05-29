import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios.js"
import { useAuth } from "../../context/AuthContext.jsx"

const units = ["kg", "quintal", "ton", "dozen", "piece", "litre"]

export default function CreateListing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "", quantity: "", unit: "kg", price: "", location: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const validate = () => {
    if (!formData.name.trim()) return "Enter a crop name"
    if (!formData.quantity || Number(formData.quantity) <= 0) return "Enter a valid quantity"
    if (!formData.price || Number(formData.price) <= 0) return "Enter a valid price"
    if (!formData.location.trim()) return "Enter a location"
    return null
  }

  const handleSubmit = async () => {
    const err = validate()
    if (err) { setError(err); return }
    setLoading(true)
    setError("")
    try {
      await api.post("/produce", formData)
      setSuccess(true)
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (user?.role === "vendor") {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#f7f8f6", fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          background: "#fff", borderRadius: 16,
          border: "1px solid #e4e7e1", padding: "40px 32px",
          textAlign: "center", maxWidth: 360,
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🚫</div>
          <h3 style={{
            fontFamily: "'Sora', sans-serif", fontSize: 18,
            fontWeight: 600, color: "#1a1f1c", marginBottom: 8,
          }}>
            Farmers only
          </h3>
          <p style={{ fontSize: 14, color: "#6b7a72", marginBottom: 20 }}>
            Only farmers can create produce listings.
          </p>
          <button
            onClick={() => navigate("/vendor/browse")}
            style={{
              background: "#1a6b3c", color: "#fff",
              border: "none", borderRadius: 9,
              padding: "10px 20px", fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Browse Listings Instead
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#f7f8f6", fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          background: "#fff", borderRadius: 16,
          border: "1px solid #e4e7e1", padding: "48px 36px",
          textAlign: "center", maxWidth: 380,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "#e8f5ee",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 30, margin: "0 auto 20px",
          }}>
            ✅
          </div>
          <h2 style={{
            fontFamily: "'Sora', sans-serif", fontSize: 22,
            fontWeight: 700, color: "#1a1f1c", marginBottom: 8,
          }}>
            Listing posted!
          </h2>
          <p style={{ fontSize: 14, color: "#6b7a72", marginBottom: 28 }}>
            Your produce is now visible to vendors across the platform.
          </p>
          <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
            <button
              onClick={() => { setSuccess(false); setFormData({ name: "", quantity: "", unit: "kg", price: "", location: "" }) }}
              style={{
                background: "#1a6b3c", color: "#fff",
                border: "none", borderRadius: 9,
                padding: "11px", fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Post Another Listing
            </button>
            <button
              onClick={() => navigate("/farmer/listings")}
              style={{
                background: "#f7f8f6", color: "#3a3f3c",
                border: "1px solid #e4e7e1", borderRadius: 9,
                padding: "11px", fontSize: 14,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}
            >
              View My Listings
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#f7f8f6",
      fontFamily: "'DM Sans', sans-serif",
      padding: "32px 24px", display: "flex",
      alignItems: "flex-start", justifyContent: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 500 }}>

        <div style={{ marginBottom: 28 }}>
          <h1 style={{
            fontFamily: "'Sora', sans-serif", fontSize: 28,
            fontWeight: 700, color: "#1a1f1c",
            letterSpacing: "-0.5px", marginBottom: 6,
          }}>
            Post a Listing
          </h1>
          <p style={{ fontSize: 14, color: "#6b7a72" }}>
            Vendors will see your produce and place orders directly.
          </p>
        </div>

        <div style={{
          background: "#fff", border: "1px solid #e4e7e1",
          borderRadius: 20, padding: "36px 32px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}>

          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca",
              borderRadius: 10, padding: "12px 14px",
              color: "#dc2626", fontSize: 13, marginBottom: 20,
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Crop name */}
          <Field label="Crop name" hint="e.g. Tomato, Rice, Wheat">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter crop name"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#1a6b3c"}
              onBlur={e => e.target.style.borderColor = "#e4e7e1"}
            />
          </Field>

          {/* Quantity + Unit */}
          <Field label="Quantity & unit">
            <div style={{ display: "flex", gap: 10 }}>
              <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. 500"
                min="1"
                style={{ ...inputStyle, flex: 2 }}
                onFocus={e => e.target.style.borderColor = "#1a6b3c"}
                onBlur={e => e.target.style.borderColor = "#e4e7e1"}
              />
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                style={{
                  ...inputStyle, flex: 1,
                  cursor: "pointer", appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236b7a72'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: 32,
                }}
              >
                {units.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </Field>

          {/* Price */}
          <Field label="Price per unit" hint={`₹ per ${formData.unit}`}>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)",
                fontSize: 14, color: "#6b7a72", fontWeight: 500,
              }}>₹</span>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                min="1"
                style={{ ...inputStyle, paddingLeft: 28 }}
                onFocus={e => e.target.style.borderColor = "#1a6b3c"}
                onBlur={e => e.target.style.borderColor = "#e4e7e1"}
              />
            </div>
          </Field>

          {/* Location */}
          <Field label="Location" hint="District or city">
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)", fontSize: 14,
              }}>📍</span>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Guntur, Andhra Pradesh"
                style={{ ...inputStyle, paddingLeft: 32 }}
                onFocus={e => e.target.style.borderColor = "#1a6b3c"}
                onBlur={e => e.target.style.borderColor = "#e4e7e1"}
              />
            </div>
          </Field>

          {/* Preview */}
          {formData.name && formData.price && formData.quantity && (
            <div style={{
              background: "#e8f5ee", border: "1px solid #b6dfc4",
              borderRadius: 12, padding: "14px 16px", marginBottom: 24,
              fontSize: 13, color: "#1a6b3c",
            }}>
              <span style={{ fontWeight: 600 }}>Preview: </span>
              {formData.name} · {formData.quantity} {formData.unit} · ₹{formData.price}/{formData.unit}
              {formData.location ? ` · ${formData.location}` : ""}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "13px",
              background: loading ? "#5a9e74" : "#1a6b3c",
              color: "#fff", border: "none", borderRadius: 10,
              fontSize: 15, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#0f4526" }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#1a6b3c" }}
          >
            {loading && (
              <span style={{
                width: 16, height: 16,
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff", borderRadius: "50%",
                display: "inline-block", animation: "spin 0.7s linear infinite",
              }} />
            )}
            {loading ? "Posting..." : "Post Listing"}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: "#3a3f3c" }}>{label}</label>
        {hint && <span style={{ fontSize: 12, color: "#6b7a72" }}>{hint}</span>}
      </div>
      {children}
    </div>
  )
}

const inputStyle = {
  width: "100%", padding: "11px 14px",
  border: "1.5px solid #e4e7e1", borderRadius: 10,
  fontSize: 14, fontFamily: "'DM Sans', sans-serif",
  outline: "none", boxSizing: "border-box",
  color: "#1a1f1c", background: "#fff",
  transition: "border-color 0.2s",
}