import { useState } from "react";
import api from "../api/axios";

export default function PlaceOrder({ produceId }) {
    const [quantity, setQuantity] = useState("");
    const [message, setMessage] = useState("");

    const handlePlaceOrder = async () => {
        try {
            if (!quantity) {

                return setMessage(
                    "Enter quantity"
                );

            }
            const response = await api.post("/orders/", { item: produceId, quantity });
            setMessage("Order placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error);
            setMessage("Failed to place order. Please try again.");
        }
    }
    return (
        <div>
            <input type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={handlePlaceOrder}>Place Order</button>
            {message && <p>{message}</p>}
        </div>
    );
}