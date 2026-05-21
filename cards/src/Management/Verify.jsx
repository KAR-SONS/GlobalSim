import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const Verify = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders()
    }, [])

    const handleVerify = async (order) => {
        if (!order?.id) {
            console.error("Order missing id", order)
            return
        }

        if (!order.user_id) {
            console.error("Order missing user_id", order)
            return
        }

        const { data: cartItems, error: cartError } = await supabase
            .from("cart_items")
            .select("product_id")
            .eq("user_id", order.user_id)

        if (cartError) {
            console.log(cartError)
            return
        }

        // MARK PRODUCTS INACTIVE
        for (const item of cartItems) {
            await supabase
                .from("products")
                .update({ is_active: false })
                .eq("id", item.product_id)
        }

        // UPDATE ORDER STATUS
        const { error: orderError } = await supabase
            .from("orders")
            .update({ status: "paid" })
            .eq("id", order.id)

        if (orderError) {
            console.log(orderError.message)
            return
        }

        // CLEAR USER CART
        const { error: deleteCartError } = await supabase
            .from("cart_items")
            .delete()
            .eq("user_id", order.user_id)

        if (deleteCartError) {
            console.log(deleteCartError.message)
            return
        }

        alert("Order verified successfully")

        fetchOrders()
    }

        const fetchOrders = async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) {
                console.log(error.message)
                return
            }

            setOrders(data)
        }

  return (
     <div className="min-h-screen flex flex-col max-w-5xl mx-auto px-4 py-10">
        
        <h1 className="text-3xl font-bold mb-6">
            Payment Verifications
        </h1>

        <div className='mt-4 relative w-full overflow-auto'>
            
            <table className='w-full border-collapse'>
                
                <thead className="bg-gray-200">
                    <tr className="text-gray-700 uppercase text-md font-semibold">
                        
                        <th className="h-12 px-4 text-left">
                            Order ID
                        </th>

                        <th className="h-12 px-4 text-left">
                            Amount
                        </th>

                        <th className="h-12 px-4 text-left">
                            User
                        </th>

                        <th className="h-12 px-4 text-left">
                            Status
                        </th>

                        <th className="h-12 px-4 text-left">
                            Action
                        </th>

                    </tr>
                </thead>

                <tbody>

                    {orders.map((order) => (
                        
                        <tr
                            key={order.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                        >

                            <td className="p-4">
                                {order.id}
                            </td>

                            <td className="p-4">
                                KES {order.total_amount}
                            </td>

                            <td className="p-4">
                                {order.user_email}
                            </td>

                            <td className="p-4">
                                <span className={`
                                    px-2 py-1 rounded text-sm font-medium
                                    ${order.status === "paid"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"}
                                `}>
                                    {order.status}
                                </span>
                            </td>

                            <td className="p-4">
                                <button 
                                 onClick={() => handleVerify(order)}
                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Verify
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

     </div>
  )
}

export default Verify