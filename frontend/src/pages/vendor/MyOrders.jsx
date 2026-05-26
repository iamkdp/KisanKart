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
        <div className="min-h-screen bg-gray-100 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-6">

                My Orders

            </h2>

            {message && (

                <p className="text-red-500 mb-4">

                    {message}

                </p>

            )}

            {orders.length === 0 ? (

                <p className="text-gray-500">

                    No orders found

                </p>

            ) : (


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {orders.map(order => (

                        <div
                            key={order._id}
                            className="bg-white rounded-lg shadow-md p-6"
                        >

                            <h3 className="text-xl font-bold text-green-700 mb-2">

                                {order.item?.name}

                            </h3>

                            <p className="text-gray-600">

                                Quantity:
                                {order.quantity}

                            </p>

                            <p className="text-gray-600">

                                Farmer:
                                {order.farmer?.name}

                            </p>

                            <p className="text-gray-600">

                                ₹{order.totalPrice}

                            </p>

                            <p>

                                Status:

                                <span className="font-semibold">

                                    {order.status}

                                </span>

                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    )

}