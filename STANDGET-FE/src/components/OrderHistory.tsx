// OrderHistory.tsx
import { useCallback, useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { currencyFormatter } from "../utils/formatting";
import Header from "./Header";
import { Orders } from "../utils/interfaces";
import { URL_API } from "../utils/url";


export default function OrderHistory() {
  const { loading, error, sendRequest } = useHttp<Orders[]>();
  const [orders, setOrders] = useState<Orders[]>([]);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await sendRequest({
        url: `${URL_API}/orders`,
        method: "GET",
      });
      setOrders(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, [sendRequest]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <p className="text-black">Loading orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;

  return (
    <>
      <Header />
      <section className="order_history mx-auto max-w-4xl p-2 text-black">
        <h1 className="text-2xl font-bold text-center">Order History</h1>
        {orders.map((order) => (
          <div key={order.id} className="border rounded p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-bold">Order #{order.id}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <ul className="mb-2">
              <li>Nama:&nbsp;{order.User?.name}</li>
              <li>Email:&nbsp;{order.User?.email}</li>
              <li>Alamat:&nbsp;{order.User?.street}</li>
              <li>Kota:&nbsp;{order.User?.city}</li>
            </ul>
            <div className="mb-2">
              <ul>
                Barang Pesanan:
                {order.Products?.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>
                      {item.OrderItem?.quantity} x{" "}
                      {currencyFormatter.format(item.price)} ={" "}
                      {currencyFormatter.format(item.OrderItem?.price)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-end">
                Total: {currencyFormatter.format(order.total)}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
