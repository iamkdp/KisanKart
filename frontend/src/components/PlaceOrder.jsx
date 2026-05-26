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
        <div className="mt-4">

            <input
                className="w-full border p-2 rounded mb-3"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) =>
                    setQuantity(
                        e.target.value
                    )
                }
            />

            <button
                className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
                onClick={handlePlaceOrder}
            >

                Place Order

            </button>

            {message && (

                <p className="text-green-700 mt-2">

                    {message}

                </p>

            )}

        </div>
    );
}