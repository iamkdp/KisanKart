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

        <div className="min-h-screen bg-gray-100 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-6">

                Received Orders

            </h2>

            {message && (

                <p className="text-red-500 mb-4">

                    {message}

                </p>

            )}

            {orders.length === 0 ? (

                <p className="text-gray-500">

                    No received orders

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

                                Vendor:
                                {order.vendor?.name}

                            </p>

                            <p className="text-gray-600">

                                ₹{order.totalPrice}

                            </p>

                            <p className="mb-4">

                                Status:

                                <span className="font-semibold">

                                    {order.status}

                                </span>

                            </p>


                            {order.status === "pending" && (

                                <div className="flex gap-3">

                                    <button
                                        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
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
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

                        </div>

                    ))}

                </div>

            )}

        </div>

    )

}