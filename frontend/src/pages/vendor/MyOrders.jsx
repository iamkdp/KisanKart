import { useState, useEffect, use } from "react";
import api from "../../api/axios";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders/my");
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setMessage("Failed to fetch orders. Please try again.");
            }
        }
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>My Orders</h2>
            {message && <p>{message}</p>}
            {orders.length === 0 && (
                <p>No orders found</p>
            )}

            {orders.map((order) => (

                <div
                    key={order._id}
                >
                    <p>
                        Item:
                        {order.item?.name}
                    </p>

                    <p>
                        Quantity:
                        {order.quantity}
                    </p>

                    <p>
                        Total:
                        ₹{order.totalPrice}
                    </p>

                    <p>
                        Farmer:
                        {order.farmer?.name}
                    </p>

                    <p>
                        Status:
                        {order.status}
                    </p>

                    <hr />

                </div>

            ))}

        </div>

    )

}