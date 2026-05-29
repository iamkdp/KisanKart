import { useState } from "react"
import api from "../api/axios"

export default function PlaceOrder({ produceId }) {
  const [quantity, setQuantity] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // null | "success" | "error"
  const [message, setMessage] = useState("")

  const handlePlaceOrder = async () => {
    if (!quantity || Number(quantity) <= 0) {
      setStatus("error")
      setMessage("Enter a valid quantity")
      return
    }
    setLoading(true)
    setStatus(null)
    try {
      await api.post("/orders/", { item: produceId, quantity: Number(quantity) })
      setStatus("success")
      setMessage("Order placed!")
      setQuantity("")
    } catch (error) {
      setStatus("error")
      setMessage(error?.response?.data?.message || "Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {status === "success" ? (
        <div style={{
          background: "#e8f5ee", border: "1px solid #b6dfc4",
          borderRadius: 10, padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 8,
          fontSize: 13, color: "#1a6b3c", fontWeight: 500,
        }}>
          ✅ Order placed successfully!
          <button
            onClick={() => setStatus(null)}
            style={{
              marginLeft: "auto", background: "none", border: "none",
              cursor: "pointer", color: "#1a6b3c", fontSize: 13,
              fontFamily: "'DM Sans', sans-serif", padding: 0,
            }}
          >
            Order again
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="number"
              placeholder="Qty"
              value={quantity}
              min="1"
              onChange={e => { setQuantity(e.target.value); setStatus(null) }}
              onKeyDown={e => e.key === "Enter" && handlePlaceOrder()}
              style={{
                flex: 1, padding: "9px 12px",
                border: `1.5px solid ${status === "error" ? "#fca5a5" : "#e4e7e1"}`,
                borderRadius: 9, fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none", color: "#1a1f1c",
                background: status === "error" ? "#fef2f2" : "#f7f8f6",
                transition: "border-color 0.2s",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#1a6b3c"
                e.target.style.background = "#fff"
              }}
              onBlur={e => {
                e.target.style.borderColor = status === "error" ? "#fca5a5" : "#e4e7e1"
                e.target.style.background = status === "error" ? "#fef2f2" : "#f7f8f6"
              }}
            />
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              style={{
                padding: "9px 16px",
                background: loading ? "#5a9e74" : "#1a6b3c",
                color: "#fff", border: "none", borderRadius: 9,
                fontSize: 13, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 6,
                transition: "background 0.15s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { if (!loading) e.target.style.background = "#0f4526" }}
              onMouseLeave={e => { if (!loading) e.target.style.background = "#1a6b3c" }}
            >
              {loading && (
                <span style={{
                  width: 12, height: 12,
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "#fff", borderRadius: "50%",
                  display: "inline-block", animation: "spin 0.7s linear infinite",
                }} />
              )}
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
          {status === "error" && (
            <p style={{ fontSize: 12, color: "#dc2626", marginTop: 6 }}>⚠️ {message}</p>
          )}
        </>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}