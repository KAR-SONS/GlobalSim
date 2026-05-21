import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardSim, Trash2Icon } from 'lucide-react'
import { supabase } from "../supabaseClient";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  useEffect(() => {
    fetchCart();
  }, []);

  const refreshCart = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        products (
          id,
          name,
          price,
          region,
          data,
          airtime,
          code
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error(error.message);
      return [];
    }

    setCart(data);
    // broadcast cart total so other pages can update counters
    const total = data?.length || 0;
    try {
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: { total } }));
    } catch (e) {
      // ignore in SSR or restricted environments
    }
    return data;
  };

  const fetchCart = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        id,
        products (
          id,
          name,
          price,
          region,
          data,
          airtime,
          code
        )
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error(error.message);
      return;
    }

    setCart(data);
  };

  const removeItem = async (cartItemId) => {
    const { error } = await supabase.from('cart_items').delete().eq('id', cartItemId);
    if (error) console.error(error.message);
    else await refreshCart();
  }

  const handleCheckout = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!cart.length) {
      alert("Cart is empty");
      return;
    }

    // TOTAL
    const totalAmount = cart.reduce(
      (sum, item) =>
        sum + Number(item.products.price),
      0
    );

    // CREATE ORDER
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error(orderError.message);
      return;
    }

    // CREATE ORDER ITEMS (IMPORTANT FIX)
    const orderItems = cart.map((item) => ({
      order_id: order.id,
      product_id: item.products.id,
    }));

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) {
      console.error("ORDER ITEMS ERROR:", orderItemsError);
      return;
    }

    // TELEGRAM MESSAGE
    const telegramMessage = `
  🛒 New GlobalSim Order

  Order ID: ${order.id}
  Amount: KES ${totalAmount}

  User: ${user.email}

  Products:
  ${cart.map((item) => `- ${item.products.name}`).join("\n")}
  `;

    // SEND TELEGRAM NOTIFICATION
    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
        }),
      }
    );

    alert("Order created successfully");

    // REDIRECT TO PAYMENT
    window.location.href = `https://lipana.dev/pay/globalsims`;
  };

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex-1 space-y-4 pb-28">

          {cart.map((item) => (
            <div
              key={item.id}
              className="card rounded-lg bg-[oklch(1_0_0)] border border-blue-200 hover:border-primary/50 overflow-hidden transition-all hover:shadow-lg group cursor-pointer h-full flex flex-col"
            >

              {/* Product Info */}
              <div className="flex items-center gap-4">

              <div className='flex items-center justify-center p-1 md:p-2'>
            <div className="bg-[oklch(0.45_0.21_262)]/10 w-14 h-14 md:w-30 md:h-30 rounded-lg flex items-center justify-center mb-2 md:mb-4 transition-colors">
              <CardSim className="w-10 h-10 md:w-30 md:h-30 p-1 md:p-4 text-blue-900" />
            </div>
            </div>

                <div>
                  <h2 className="font-semibold">
                    {item.products.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {item.products.region}
                  </p>
                </div>

              </div>

              <div className="text-start flex items-center justify-between mt-2 p-4">
                <p className="font-medium">Code: {item.products.code}</p>
                <button onClick={() => removeItem(item.id)} className="text-sm text-red-600 mt-2"><Trash2Icon /></button>
              </div>

            </div>
          ))}

          <div className="text-right font-bold">
            Total: KES {cart.reduce((sum, item) => sum + Number(item.products.price), 0).toFixed(2)}
          </div>

        </div>
      )}

      {cart.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 z-10 w-full bg-[oklch(0.98_0.001_0)]/95 backdrop-blur border-t border-[oklch(0.93_0.002_0)] py-4">
          <div className="max-w-5xl mx-auto px-4">
            <button  onClick={handleCheckout} className="w-full bg-blue-500 text-white font-semibold py-3 px-4 hover:bg-blue-600 transition-colors rounded-lg shadow-lg">
              Checkout <span className="text-xl ml-2">Ksh {cart.reduce((sum, item) => sum + Number(item.products.price), 0).toFixed(2)}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;