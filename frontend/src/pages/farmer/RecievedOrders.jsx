import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ReceivedOrders() {

    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");

    const fetchOrders = async () => {

        try {

            const res =
                await api.get(
                    "/orders/received"
                );

            setOrders(
                res.data.orders
            );

        }
        catch (error) {

            setMessage(
                error?.response?.data?.message ||
                "Failed to fetch orders"
            );

        }

    }

    useEffect(() => {

        fetchOrders();

    }, []);


    const updateStatus = async (
        id,
        status
    ) => {

        try {

            await api.put(
                `/orders/${id}`,
                { status }
            );

            setOrders(
                orders.map(
                    order =>

                        order._id === id

                            ? {
                                ...order,
                                status
                            }

                            : order
                )
            );

        }
        catch (error) {

            setMessage(
                error?.response?.data?.message ||
                "Failed to update order"
            );

        }

    }

    return (

        <div>

            <h2>
                Received Orders
            </h2>

            {message &&
                <p>
                    {message}
                </p>
            }

            {orders.length === 0 &&
                <p>
                    No received orders
                </p>
            }

            {orders.map(order => (

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
                        Vendor:
                        {order.vendor?.name}
                    </p>

                    <p>
                        Total:
                        ₹{order.totalPrice}
                    </p>

                    <p>
                        Status:
                        {order.status}
                    </p>

                    {order.status === "pending" && (

                        <div>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        order._id,
                                        "accepted"
                                    )
                                }
                            >
                                Accept
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        order._id,
                                        "rejected"
                                    )
                                }
                            >
                                Reject
                            </button>

                        </div>

                    )}

                    <hr />

                </div>

            ))}

        </div>

    )

}