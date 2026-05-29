import { useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      fontFamily: "'DM Sans', sans-serif",
      background: "#f7f8f6",
    }}>

      {/* Left panel */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "32px 24px",
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          {/* Mobile logo */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span style={{
                fontFamily: "'Sora', sans-serif", fontWeight: 700,
                fontSize: 22, color: "#1a6b3c", letterSpacing: "-0.3px",
              }}>
                🌾 KisanKart
              </span>
            </Link>
          </div>

          <div style={{
            background: "#fff",
            border: "1px solid #e4e7e1",
            borderRadius: 20,
            padding: "40px 36px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}>
            <h1 style={{
              fontFamily: "'Sora', sans-serif", fontSize: 26,
              fontWeight: 700, color: "#1a1f1c",
              letterSpacing: "-0.5px", marginBottom: 6,
            }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 14, color: "#6b7a72", marginBottom: 32 }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#1a6b3c", fontWeight: 500, textDecoration: "none" }}>
                Register here
              </Link>
            </p>

            {/* Error */}
            {error && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca",
                borderRadius: 10, padding: "12px 14px",
                color: "#dc2626", fontSize: 13, marginBottom: 20,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "#3a3f3c", display: "block", marginBottom: 6 }}>
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                onKeyDown={handleKey}
                style={{
                  width: "100%", padding: "11px 14px",
                  border: "1.5px solid #e4e7e1", borderRadius: 10,
                  fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                  outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.2s",
                  color: "#1a1f1c", background: "#fff",
                }}
                onFocus={e => e.target.style.borderColor = "#1a6b3c"}
                onBlur={e => e.target.style.borderColor = "#e4e7e1"}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "#3a3f3c", display: "block", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  onKeyDown={handleKey}
                  style={{
                    width: "100%", padding: "11px 44px 11px 14px",
                    border: "1.5px solid #e4e7e1", borderRadius: 10,
                    fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                    outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.2s",
                    color: "#1a1f1c", background: "#fff",
                  }}
                  onFocus={e => e.target.style.borderColor = "#1a6b3c"}
                  onBlur={e => e.target.style.borderColor = "#e4e7e1"}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute", right: 12, top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none",
                    cursor: "pointer", fontSize: 16, color: "#6b7a72",
                    padding: 0, lineHeight: 1,
                  }}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit */}
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
              onMouseEnter={e => { if (!loading) e.target.style.background = "#0f4526" }}
              onMouseLeave={e => { if (!loading) e.target.style.background = "#1a6b3c" }}
            >
              {loading && (
                <span style={{
                  width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "#fff", borderRadius: "50%",
                  display: "inline-block", animation: "spin 0.7s linear infinite",
                }} />
              )}
              {loading ? "Logging in..." : "Login →"}
            </button>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        display: "none",
        flex: 1,
        background: "linear-gradient(160deg, #0f4526 0%, #1a6b3c 100%)",
        padding: "48px",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "100vh",
      }}
        className="left-panel"
      >

        <span style={{
          fontFamily: "'Sora', sans-serif", fontWeight: 700,
          fontSize: 22, color: "#fff", letterSpacing: "-0.3px",
          marginBottom: 80,
        }}>
          🌾 KisanKart
        </span>

        <div>
          <h2 style={{
            fontFamily: "'Sora', sans-serif", fontSize: 32,
            fontWeight: 700, color: "#fff", letterSpacing: "-0.8px",
            lineHeight: 1.2, marginBottom: 16,
          }}>
            Trade without<br />
            <span style={{ color: "#f5a623" }}>middlemen.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
            Connect directly with the other side of the supply chain.
            Farmers earn more. Vendors pay less.
          </p>

          {[
            { icon: "✅", text: "Zero commission on every trade" },
            { icon: "✅", text: "Direct contact with farmers or vendors" },
            { icon: "✅", text: "Filter by crop, quantity, and location" },
            { icon: "✅", text: "Accept or reject orders on your terms" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              marginBottom: 14, color: "rgba(255,255,255,0.85)", fontSize: 14,
            }}>
              <span>{item.icon}</span> {item.text}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .left-panel { display: flex !important; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}